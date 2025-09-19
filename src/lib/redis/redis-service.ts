import {
  executeRedisOperation,
  RedisClientManager,
  RedisOperationError,
} from './redis-client';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  namespace?: string; // Optional namespace for keys
}

export interface SessionData {
  [key: string]: unknown;
}

/**
 * Redis Service Layer - Provides high-level Redis operations
 * High cohesion: Groups related Redis operations together
 * Low coupling: Abstracts Redis implementation details from business logic
 */
export class RedisService {
  private static instance: RedisService | null = null;
  private defaultNamespace: string;

  private constructor(defaultNamespace: string = 'app') {
    this.defaultNamespace = defaultNamespace;
  }

  /**
   * Get singleton instance of Redis Service
   */
  public static getInstance(defaultNamespace?: string): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService(defaultNamespace);
    }
    return RedisService.instance;
  }

  /**
   * Get a value from Redis cache
   */
  public async get<T = string>(
    key: string,
    options: CacheOptions = {}
  ): Promise<T | null> {
    const namespacedKey = this.buildKey(key, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        const value = await client.get(namespacedKey);
        return value ? this.deserialize<T>(value) : null;
      }, `get:${namespacedKey}`);
    } catch (error) {
      if (error instanceof RedisOperationError) {
        console.warn(
          `Redis operation failed for key '${namespacedKey}':`,
          error.originalError
        );
      } else {
        console.warn(`Failed to get key '${namespacedKey}':`, error);
      }
      return null; // Graceful degradation
    }
  }

  /**
   * Set a value in Redis cache
   */
  public async set(
    key: string,
    value: unknown,
    options: CacheOptions = {}
  ): Promise<boolean> {
    const namespacedKey = this.buildKey(key, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        const serializedValue = this.serialize(value);

        if (options.ttl && options.ttl > 0) {
          const result = await client.setex(
            namespacedKey,
            options.ttl,
            serializedValue
          );
          return result === 'OK';
        } else {
          const result = await client.set(namespacedKey, serializedValue);
          return result === 'OK';
        }
      }, `set:${namespacedKey}`);
    } catch (error) {
      if (error instanceof RedisOperationError) {
        console.error(
          `Redis operation failed for key '${namespacedKey}':`,
          error.originalError
        );
      } else {
        console.error(`Failed to set key '${namespacedKey}':`, error);
      }
      return false; // Graceful degradation
    }
  }

  /**
   * Delete a key from Redis
   */
  public async delete(
    key: string,
    options: CacheOptions = {}
  ): Promise<boolean> {
    const namespacedKey = this.buildKey(key, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        const result = await client.del(namespacedKey);
        return result > 0;
      }, `delete:${namespacedKey}`);
    } catch (error) {
      console.warn(`Failed to delete key '${namespacedKey}':`, error);
      return false; // Graceful degradation
    }
  }

  /**
   * Check if a key exists in Redis
   */
  public async exists(
    key: string,
    options: CacheOptions = {}
  ): Promise<boolean> {
    const namespacedKey = this.buildKey(key, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        const result = await client.exists(namespacedKey);
        return result === 1;
      }, `exists:${namespacedKey}`);
    } catch (error) {
      console.warn(
        `Failed to check existence of key '${namespacedKey}':`,
        error
      );
      return false; // Graceful degradation
    }
  }

  /**
   * Set expiration on a key
   */
  public async expire(
    key: string,
    ttl: number,
    options: CacheOptions = {}
  ): Promise<boolean> {
    const namespacedKey = this.buildKey(key, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        const result = await client.expire(namespacedKey, ttl);
        return result === 1;
      }, `expire:${namespacedKey}`);
    } catch (error) {
      console.warn(
        `Failed to set expiration on key '${namespacedKey}':`,
        error
      );
      return false; // Graceful degradation
    }
  }

  /**
   * Get time to live for a key
   */
  public async ttl(key: string, options: CacheOptions = {}): Promise<number> {
    const namespacedKey = this.buildKey(key, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        return await client.ttl(namespacedKey);
      }, `ttl:${namespacedKey}`);
    } catch (error) {
      console.warn(`Failed to get TTL for key '${namespacedKey}':`, error);
      return -1; // Graceful degradation
    }
  }

  /**
   * Get multiple values at once
   */
  public async mget<T = string>(
    keys: string[],
    options: CacheOptions = {}
  ): Promise<(T | null)[]> {
    const namespacedKeys = keys.map((key) =>
      this.buildKey(key, options.namespace)
    );

    try {
      return await executeRedisOperation(async (client) => {
        const values = await client.mget(...namespacedKeys);
        return values.map((value) =>
          value ? this.deserialize<T>(value) : null
        );
      }, `mget:${namespacedKeys.length}_keys`);
    } catch (error) {
      console.warn(`Failed to get multiple keys:`, error);
      return keys.map(() => null); // Graceful degradation
    }
  }

  /**
   * Set multiple values at once
   */
  public async mset(
    keyValuePairs: Record<string, unknown>,
    options: CacheOptions = {}
  ): Promise<boolean> {
    try {
      return await executeRedisOperation(
        async (client) => {
          const pipeline = client.pipeline();

          Object.entries(keyValuePairs).forEach(([key, value]) => {
            const namespacedKey = this.buildKey(key, options.namespace);
            const serializedValue = this.serialize(value);

            if (options.ttl && options.ttl > 0) {
              pipeline.setex(namespacedKey, options.ttl, serializedValue);
            } else {
              pipeline.set(namespacedKey, serializedValue);
            }
          });

          const results = await pipeline.exec();
          return (
            results?.every(([error, result]) => !error && result === 'OK') ||
            false
          );
        },
        `mset:${Object.keys(keyValuePairs).length}_keys`
      );
    } catch (error) {
      console.error(`Failed to set multiple keys:`, error);
      return false; // Graceful degradation
    }
  }

  /**
   * Delete keys matching a pattern
   */
  public async deletePattern(
    pattern: string,
    options: CacheOptions = {}
  ): Promise<number> {
    const namespacedPattern = this.buildKey(pattern, options.namespace);

    try {
      return await executeRedisOperation(async (client) => {
        const keys = await client.keys(namespacedPattern);
        if (keys.length === 0) return 0;

        const deletedCount = await client.del(...keys);
        return deletedCount;
      }, `deletePattern:${namespacedPattern}`);
    } catch (error) {
      console.warn(
        `Failed to delete keys matching pattern '${namespacedPattern}':`,
        error
      );
      return 0; // Graceful degradation
    }
  }

  /**
   * Get Redis health status
   */
  public async getHealthStatus(): Promise<{
    isHealthy: boolean;
    connectionInfo: unknown;
    error?: string;
  }> {
    try {
      const manager = RedisClientManager.getInstance();
      const healthInfo = manager.getHealthInfo();

      // Try a simple ping operation
      const pingResult = await executeRedisOperation(async (client) => {
        const result = await client.ping();
        return result === 'PONG';
      }, 'health_check_ping');

      return {
        isHealthy: healthInfo.isHealthy && pingResult,
        connectionInfo: healthInfo,
      };
    } catch (error) {
      const errorMessage =
        error instanceof RedisOperationError
          ? error.originalError.message
          : error instanceof Error
            ? error.message
            : String(error);

      return {
        isHealthy: false,
        connectionInfo: null,
        error: errorMessage,
      };
    }
  }

  /**
   * Graceful shutdown
   */
  public async shutdown(): Promise<void> {
    const manager = RedisClientManager.getInstance();
    await manager.shutdown();
    RedisService.instance = null;
  }

  /**
   * Build namespaced key
   */
  private buildKey(key: string, namespace?: string): string {
    const ns = namespace || this.defaultNamespace;
    return `${ns}:${key}`;
  }

  /**
   * Serialize value for storage
   */
  private serialize(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.warn('Failed to serialize value, storing as string:', error);
      return String(value);
    }
  }

  /**
   * Deserialize value from storage
   */
  private deserialize<T>(value: string): T {
    try {
      return JSON.parse(value) as T;
    } catch {
      // If parsing fails, return as string (or original type)
      return value as unknown as T;
    }
  }

  /**
   * Reset singleton instance (useful for testing)
   */
  public static reset(): void {
    RedisService.instance = null;
  }
}

// Export convenience instance
export const redisService = RedisService.getInstance();
