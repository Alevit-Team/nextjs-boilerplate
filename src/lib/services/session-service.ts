import { redisService } from '../redis/redis-service';
import { randomBytes } from 'crypto';
import { z } from 'zod';

export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const SESSION_TOUCH_INTERVAL_SECONDS = 60 * 5; // 5 minutes

// Session schema for validation
const sessionSchema = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.string().optional(),
  lastAccessed: z.string().optional(),
});

export type SessionData = z.infer<typeof sessionSchema>;

export interface SessionServiceConfig {
  namespace?: string;
  sessionTtl?: number;
  touchInterval?: number;
}

/**
 * Session Service - Domain-specific session management
 * High cohesion: All session-related operations in one place
 * Low coupling: Uses Redis service abstraction, not direct Redis client
 */
export class SessionService {
  private static instance: SessionService | null = null;
  private config: Required<SessionServiceConfig>;

  private constructor(config: SessionServiceConfig = {}) {
    this.config = {
      namespace: 'session',
      sessionTtl: SESSION_EXPIRATION_SECONDS,
      touchInterval: SESSION_TOUCH_INTERVAL_SECONDS,
      ...config,
    };
  }

  /**
   * Get singleton instance
   */
  public static getInstance(config?: SessionServiceConfig): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService(config);
    }
    return SessionService.instance;
  }

  /**
   * Create a new session
   */
  public async createSession(
    userData: Omit<SessionData, 'createdAt' | 'lastAccessed'>
  ): Promise<string | null> {
    try {
      // Generate a secure session ID
      const sessionId = this.generateSessionId();

      // Prepare session data with timestamps
      const sessionData: SessionData = {
        ...userData,
        createdAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
      };

      // Validate session data
      const validatedData = sessionSchema.parse(sessionData);

      // Store session in Redis
      const success = await redisService.set(sessionId, validatedData, {
        ttl: this.config.sessionTtl,
        namespace: this.config.namespace,
      });

      if (!success) {
        console.error('Failed to store session in Redis');
        return null;
      }

      console.log(`Session created: ${sessionId}`);
      return sessionId;
    } catch (error) {
      console.error('Failed to create session:', error);
      return null;
    }
  }

  /**
   * Get session data by session ID
   */
  public async getSession(sessionId: string): Promise<SessionData | null> {
    if (!sessionId || typeof sessionId !== 'string') {
      return null;
    }

    try {
      const sessionData = await redisService.get<SessionData>(sessionId, {
        namespace: this.config.namespace,
      });

      if (!sessionData) {
        return null;
      }

      // Validate session data structure
      const validatedData = sessionSchema.safeParse(sessionData);
      if (!validatedData.success) {
        console.warn(
          'Invalid session data structure, removing session:',
          sessionId
        );
        await this.deleteSession(sessionId);
        return null;
      }

      return validatedData.data;
    } catch (error) {
      console.warn(`Failed to get session ${sessionId}:`, error);
      return null;
    }
  }

  /**
   * Update session expiration and last accessed time
   * Implements throttling to avoid excessive Redis calls
   */
  public async touchSession(
    sessionId: string,
    lastTouchTime?: number
  ): Promise<boolean> {
    if (!sessionId) {
      return false;
    }

    try {
      // Implement throttling - don't update too frequently
      const now = Date.now();
      const throttleMs = this.config.touchInterval * 1000;

      if (lastTouchTime && now - lastTouchTime < throttleMs) {
        return true; // Skip update, too recent
      }

      // Get current session data
      const sessionData = await this.getSession(sessionId);
      if (!sessionData) {
        return false;
      }

      // Update last accessed time
      const updatedData: SessionData = {
        ...sessionData,
        lastAccessed: new Date().toISOString(),
      };

      // Update session in Redis with new TTL
      const success = await redisService.set(sessionId, updatedData, {
        ttl: this.config.sessionTtl,
        namespace: this.config.namespace,
      });

      if (success) {
        console.log(`Session touched: ${sessionId}`);
      }

      return success;
    } catch (error) {
      console.warn(`Failed to touch session ${sessionId}:`, error);
      return false;
    }
  }

  /**
   * Delete a session
   */
  public async deleteSession(sessionId: string): Promise<boolean> {
    if (!sessionId) {
      return false;
    }

    try {
      const success = await redisService.delete(sessionId, {
        namespace: this.config.namespace,
      });

      if (success) {
        console.log(`Session deleted: ${sessionId}`);
      }

      return success;
    } catch (error) {
      console.warn(`Failed to delete session ${sessionId}:`, error);
      return false;
    }
  }

  /**
   * Validate session and return user data
   */
  public async validateSession(sessionId: string): Promise<SessionData | null> {
    const sessionData = await this.getSession(sessionId);

    if (!sessionData) {
      return null;
    }

    // Check if session is expired (additional safety check)
    if (sessionData.lastAccessed) {
      const lastAccessed = new Date(sessionData.lastAccessed);
      const now = new Date();
      const ageInSeconds = (now.getTime() - lastAccessed.getTime()) / 1000;

      if (ageInSeconds > this.config.sessionTtl) {
        console.log(`Session expired, removing: ${sessionId}`);
        await this.deleteSession(sessionId);
        return null;
      }
    }

    return sessionData;
  }

  /**
   * Get all sessions for a user (by user ID)
   * Note: This is an expensive operation, use sparingly
   */
  public async getUserSessions(
    userId: string
  ): Promise<{ sessionId: string; data: SessionData }[]> {
    try {
      // This would require a more sophisticated approach in production
      // For now, this is a placeholder that would need additional indexing
      console.warn(
        'getUserSessions is not efficiently implemented - requires additional Redis indexing'
      );
      return [];
    } catch (error) {
      console.error(`Failed to get user sessions for ${userId}:`, error);
      return [];
    }
  }

  /**
   * Clean up expired sessions (maintenance operation)
   * Note: Redis handles TTL automatically, but this can be used for additional cleanup
   */
  public async cleanupExpiredSessions(): Promise<number> {
    try {
      // In a real implementation, you might want to track sessions separately
      // for efficient cleanup. For now, rely on Redis TTL
      console.log(
        'Session cleanup - relying on Redis TTL for automatic cleanup'
      );
      return 0;
    } catch (error) {
      console.error('Failed to cleanup expired sessions:', error);
      return 0;
    }
  }

  /**
   * Get session service health status
   */
  public async getHealthStatus(): Promise<{
    isHealthy: boolean;
    sessionCount?: number;
    redisHealth: unknown;
    error?: string;
  }> {
    try {
      const redisHealth = await redisService.getHealthStatus();

      // Test basic session operations
      const testSessionId = 'health-check-test';
      const testData = { id: 'test', role: 'test' };

      const createSuccess = await redisService.set(testSessionId, testData, {
        ttl: 60,
        namespace: this.config.namespace,
      });

      if (createSuccess) {
        await redisService.delete(testSessionId, {
          namespace: this.config.namespace,
        });
      }

      return {
        isHealthy: redisHealth.isHealthy && createSuccess,
        redisHealth,
      };
    } catch (error) {
      return {
        isHealthy: false,
        redisHealth: null,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Generate a cryptographically secure session ID
   */
  private generateSessionId(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Reset singleton instance (useful for testing)
   */
  public static reset(): void {
    SessionService.instance = null;
  }
}

// Export convenience instance
export const sessionService = SessionService.getInstance();
