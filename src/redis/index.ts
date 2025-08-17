import { Redis } from 'ioredis';

let client: Redis | null = null;
let isRedisAvailable = true;
let lastConnectionAttempt = 0;
const CONNECTION_RETRY_INTERVAL = 30000; // 30 seconds

function getRedisClient(): Redis {
  // Skip Redis initialization if no URL is provided (e.g., during build)
  if (!process.env.REDIS_URL) {
    throw new Error(
      'Redis connection attempted without REDIS_URL environment variable'
    );
  }

  // If Redis was previously unavailable, don't spam connection attempts
  if (!isRedisAvailable) {
    const now = Date.now();
    if (now - lastConnectionAttempt < CONNECTION_RETRY_INTERVAL) {
      throw new Error('Redis is temporarily unavailable');
    }
    // Reset for retry
    lastConnectionAttempt = now;
    isRedisAvailable = true;
    client = null; // Force new client creation
  }

  if (!client) {
    client = new Redis(process.env.REDIS_URL, {
      enableOfflineQueue: false,
      maxRetriesPerRequest: 1, // Reduce retries
      lazyConnect: true,
      connectTimeout: 5000, // 5 second timeout
      commandTimeout: 5000, // 5 second command timeout
    });

    // Connection event handlers with better error management
    client.on('connect', () => {
      console.log('✅ Connected to Redis');
      isRedisAvailable = true;
    });

    client.on('error', () => {
      if (isRedisAvailable) {
        console.warn('⚠️  Redis unavailable, session management disabled');
        isRedisAvailable = false;
        lastConnectionAttempt = Date.now();
      }
      // Don't spam logs - only log once when connection is lost
    });

    client.on('close', () => {
      if (isRedisAvailable) {
        console.log('🔌 Redis connection closed');
        isRedisAvailable = false;
      }
    });
  }

  return client;
}

// Graceful shutdown
function closeRedisClient(): void {
  if (client) {
    client.disconnect();
    client = null;
  }
}

export default getRedisClient;
export { closeRedisClient };
