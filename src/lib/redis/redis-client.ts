import { Redis, RedisOptions } from 'ioredis';

export enum RedisConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
}

export interface RedisClientConfig {
  url?: string;
  maxRetries?: number;
  retryInterval?: number;
  commandTimeout?: number;
  connectTimeout?: number;
  enableOfflineQueue?: boolean;
}

export interface RedisHealthInfo {
  state: RedisConnectionState;
  lastError?: string;
  connectedAt?: Date;
  errorCount: number;
  isHealthy: boolean;
}

/**
 * Redis Client Manager - Singleton pattern for managing Redis connections
 * Provides high cohesion by centralizing all Redis connection logic
 * Ensures low coupling by providing a clean interface for Redis operations
 */
export class RedisClientManager {
  private static instance: RedisClientManager | null = null;
  private client: Redis | null = null;
  private config: RedisClientConfig;
  private state: RedisConnectionState = RedisConnectionState.DISCONNECTED;
  private lastError: string | null = null;
  private connectedAt: Date | null = null;
  private errorCount: number = 0;
  private reconnectAttempts: number = 0;
  private isShuttingDown: boolean = false;

  private constructor(config: RedisClientConfig) {
    this.config = {
      maxRetries: 3,
      retryInterval: 1000,
      commandTimeout: 5000,
      connectTimeout: 10000,
      enableOfflineQueue: true,
      ...config,
    };
  }

  /**
   * Get singleton instance of Redis Client Manager
   */
  public static getInstance(config?: RedisClientConfig): RedisClientManager {
    if (!RedisClientManager.instance) {
      if (!config?.url && !process.env.REDIS_URL) {
        throw new Error(
          'Redis URL must be provided either in config or REDIS_URL environment variable'
        );
      }

      RedisClientManager.instance = new RedisClientManager({
        url: process.env.REDIS_URL,
        ...config,
      });
    }
    return RedisClientManager.instance;
  }

  /**
   * Initialize Redis connection with proper error handling
   */
  public async initialize(): Promise<void> {
    if (this.client && this.state === RedisConnectionState.CONNECTED) {
      return;
    }

    if (!this.config.url) {
      throw new Error('Redis URL is required for initialization');
    }

    try {
      this.state = RedisConnectionState.CONNECTING;

      const redisOptions: RedisOptions = {
        enableOfflineQueue: this.config.enableOfflineQueue,
        maxRetriesPerRequest: this.config.maxRetries,
        connectTimeout: this.config.connectTimeout,
        commandTimeout: this.config.commandTimeout,
        lazyConnect: false,
        keepAlive: 30000,
        family: 4, // Force IPv4
      };

      this.client = new Redis(this.config.url, redisOptions);
      this.setupEventHandlers();

      // Wait for connection to be established
      await this.waitForConnection();
    } catch (error) {
      this.handleConnectionError(
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }
  }

  /**
   * Get Redis client instance
   * Automatically initializes if not already done
   */
  public async getClient(): Promise<Redis> {
    if (!this.client || this.state !== RedisConnectionState.CONNECTED) {
      await this.initialize();
    }

    if (!this.client) {
      throw new Error('Redis client is not available');
    }

    return this.client;
  }

  /**
   * Execute Redis command with automatic retry and error handling
   */
  public async executeCommand<T>(
    operation: (client: Redis) => Promise<T>,
    operationName: string = 'unknown'
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= (this.config.maxRetries || 3); attempt++) {
      try {
        const client = await this.getClient();
        const result = await operation(client);

        // Reset error count on successful operation
        this.errorCount = 0;
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        this.errorCount++;

        console.warn(
          `Redis operation '${operationName}' failed (attempt ${attempt}):`,
          lastError.message
        );

        // Don't retry on certain errors
        if (this.isNonRetryableError(lastError)) {
          break;
        }

        // Wait before retry (except on last attempt)
        if (attempt < (this.config.maxRetries || 3)) {
          await this.delay(this.config.retryInterval || 1000);
        }
      }
    }

    // All retries failed
    this.handleOperationError(lastError!, operationName);
    throw new RedisOperationError(
      `Redis operation '${operationName}' failed after ${this.config.maxRetries} attempts`,
      lastError!
    );
  }

  /**
   * Get health information about Redis connection
   */
  public getHealthInfo(): RedisHealthInfo {
    return {
      state: this.state,
      lastError: this.lastError || undefined,
      connectedAt: this.connectedAt || undefined,
      errorCount: this.errorCount,
      isHealthy:
        this.state === RedisConnectionState.CONNECTED && this.errorCount < 5,
    };
  }

  /**
   * Graceful shutdown of Redis connection
   */
  public async shutdown(): Promise<void> {
    this.isShuttingDown = true;

    if (this.client) {
      try {
        await this.client.quit();
      } catch (error) {
        console.warn('Error during Redis shutdown:', error);
      } finally {
        this.client = null;
        this.state = RedisConnectionState.DISCONNECTED;
        this.connectedAt = null;
      }
    }
  }

  /**
   * Reset singleton instance (useful for testing)
   */
  public static reset(): void {
    RedisClientManager.instance = null;
  }

  private setupEventHandlers(): void {
    if (!this.client) return;

    this.client.on('connect', () => {
      console.log('🔗 Redis connecting...');
      this.state = RedisConnectionState.CONNECTING;
    });

    this.client.on('ready', () => {
      console.log('✅ Redis connected and ready');
      this.state = RedisConnectionState.CONNECTED;
      this.connectedAt = new Date();
      this.errorCount = 0;
      this.reconnectAttempts = 0;
      this.lastError = null;
    });

    this.client.on('error', (error) => {
      this.handleConnectionError(error);
    });

    this.client.on('close', () => {
      if (!this.isShuttingDown) {
        console.log('🔌 Redis connection closed');
        this.state = RedisConnectionState.DISCONNECTED;
        this.connectedAt = null;
      }
    });

    this.client.on('reconnecting', (ms: number) => {
      this.reconnectAttempts++;
      console.log(
        `🔄 Redis reconnecting in ${ms}ms (attempt ${this.reconnectAttempts})`
      );
      this.state = RedisConnectionState.RECONNECTING;
    });

    this.client.on('end', () => {
      if (!this.isShuttingDown) {
        console.log('🔚 Redis connection ended');
        this.state = RedisConnectionState.DISCONNECTED;
      }
    });
  }

  private async waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject(new Error('Redis client not initialized'));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('Redis connection timeout'));
      }, this.config.connectTimeout || 10000);

      this.client.once('ready', () => {
        clearTimeout(timeout);
        resolve();
      });

      this.client.once('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  private handleConnectionError(error: Error): void {
    this.state = RedisConnectionState.ERROR;
    this.lastError = error.message;
    this.errorCount++;

    if (!this.isShuttingDown) {
      console.error('❌ Redis connection error:', error.message);
    }
  }

  private handleOperationError(error: Error, operationName: string): void {
    console.error(`Redis operation '${operationName}' failed:`, error.message);
  }

  private isNonRetryableError(error: Error): boolean {
    const nonRetryablePatterns = [
      'NOAUTH',
      'WRONGPASS',
      'NOPERM',
      'READONLY',
      'MOVED',
      'ASK',
    ];

    return nonRetryablePatterns.some((pattern) =>
      error.message.toUpperCase().includes(pattern)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Custom error class for Redis operations
 */
export class RedisOperationError extends Error {
  public readonly originalError: Error;

  constructor(message: string, originalError: Error) {
    super(message);
    this.name = 'RedisOperationError';
    this.originalError = originalError;
  }
}

// Export convenience function for getting Redis client
export const getRedisClient = async (): Promise<Redis> => {
  const manager = RedisClientManager.getInstance();
  return manager.getClient();
};

// Export convenience function for executing Redis operations
export const executeRedisOperation = async <T>(
  operation: (client: Redis) => Promise<T>,
  operationName: string = 'unknown'
): Promise<T> => {
  const manager = RedisClientManager.getInstance();
  return manager.executeCommand(operation, operationName);
};
