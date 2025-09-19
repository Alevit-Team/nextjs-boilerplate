# Redis Architecture Documentation

This document describes the new Redis client architecture implemented with high cohesion and low coupling principles.

## Architecture Overview

The Redis architecture consists of three main layers:

```
┌─────────────────────────────────────────────────────────┐
│                 Application Layer                        │
│  (Auth Actions, Session Management, Business Logic)     │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                Session Service                          │
│  (Domain-specific session operations)                   │
│  - createSession()                                      │
│  - getSession()                                         │
│  - touchSession()                                       │
│  - deleteSession()                                      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                Redis Service                            │
│  (High-level Redis operations)                          │
│  - get() / set() / delete()                            │
│  - mget() / mset()                                      │
│  - Serialization/Deserialization                       │
│  - Graceful Error Handling                             │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│            Redis Client Manager                         │
│  (Connection management and low-level operations)       │
│  - Singleton Pattern                                    │
│  - Connection Pooling                                   │
│  - Automatic Reconnection                              │
│  - Health Monitoring                                    │
└─────────────────────────────────────────────────────────┘
```

## Components

### 1. Redis Client Manager (`redis-client.ts`)

**Purpose**: Low-level Redis connection management with singleton pattern.

**Features**:

- ✅ Singleton pattern for efficient resource usage
- ✅ Automatic connection management and reconnection
- ✅ Health monitoring and error tracking
- ✅ Command retry logic with exponential backoff
- ✅ Graceful degradation on connection failures
- ✅ Connection pooling and optimization

**Usage**:

```typescript
import { RedisClientManager, executeRedisOperation } from '@/lib/redis-client';

// Get client instance
const manager = RedisClientManager.getInstance();
const client = await manager.getClient();

// Execute operations with automatic retry
const result = await executeRedisOperation(
  async (client) => await client.get('key'),
  'get_operation'
);
```

### 2. Redis Service (`redis-service.ts`)

**Purpose**: High-level Redis operations with clean abstractions.

**Features**:

- ✅ Clean API for common Redis operations
- ✅ Automatic serialization/deserialization
- ✅ Namespace support for key organization
- ✅ TTL management
- ✅ Batch operations (mget/mset)
- ✅ Graceful error handling with fallbacks

**Usage**:

```typescript
import { redisService } from '@/lib/redis-service';

// Simple operations
await redisService.set('user:123', userData, { ttl: 3600 });
const user = await redisService.get<UserData>('user:123');

// Batch operations
await redisService.mset(
  {
    'user:123': userData,
    'user:456': otherUserData,
  },
  { ttl: 3600 }
);

// Namespaced operations
await redisService.set('session-id', sessionData, {
  namespace: 'sessions',
  ttl: 604800,
});
```

### 3. Session Service (`session-service.ts`)

**Purpose**: Domain-specific session management operations.

**Features**:

- ✅ Secure session ID generation
- ✅ Session validation and schema enforcement
- ✅ Touch/refresh functionality with throttling
- ✅ Session lifecycle management
- ✅ Health monitoring for session operations

**Usage**:

```typescript
import { sessionService } from '@/lib/session-service';

// Create session
const sessionId = await sessionService.createSession({
  id: 'user-123',
  role: 'user',
});

// Get session
const session = await sessionService.getSession(sessionId);

// Touch session (with throttling)
await sessionService.touchSession(sessionId, lastTouchTime);

// Delete session
await sessionService.deleteSession(sessionId);
```

## Configuration

### Environment Variables

```env
REDIS_URL=redis://localhost:6379
```

### Custom Configuration

```typescript
// Custom Redis configuration
const manager = RedisClientManager.getInstance({
  url: 'redis://localhost:6379',
  maxRetries: 5,
  retryInterval: 2000,
  commandTimeout: 10000,
  connectTimeout: 15000,
});

// Custom session configuration
const sessionService = SessionService.getInstance({
  namespace: 'my-sessions',
  sessionTtl: 86400, // 24 hours
  touchInterval: 300, // 5 minutes
});
```

## Error Handling

The architecture implements comprehensive error handling:

### 1. Connection Errors

- Automatic reconnection with exponential backoff
- Circuit breaker pattern for failed connections
- Health monitoring with state tracking

### 2. Operation Errors

- Automatic retry with configurable attempts
- Graceful degradation on failures
- Detailed error logging with operation context

### 3. Session Errors

- Validation of session data structure
- Cleanup of corrupted sessions
- Fallback to cookie-only authentication when Redis fails

## Health Monitoring

### Health Check Endpoint

```
GET /api/health/redis
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "redis",
  "details": {
    "session_service": true,
    "redis_connection": {
      "state": "connected",
      "connectedAt": "2024-01-15T10:25:00.000Z",
      "errorCount": 0,
      "isHealthy": true
    }
  }
}
```

### Programmatic Health Checks

```typescript
// Check Redis health
const redisHealth = await redisService.getHealthStatus();

// Check session service health
const sessionHealth = await sessionService.getHealthStatus();
```

## Migration Guide

### From Legacy Redis Client

Old:

```typescript
import getRedisClient from '@/redis';

const client = getRedisClient();
await client.set('key', 'value');
```

New:

```typescript
import { redisService } from '@/lib/redis-service';

await redisService.set('key', 'value');
```

### Session Management Migration

Old:

```typescript
import { createUserSession } from '@/auth/core/session';

await createUserSession(userData, cookies);
```

New (already migrated):

```typescript
// The existing session.ts functions now use the new architecture internally
await createUserSession(userData, cookies);
```

## Best Practices

### 1. **Use Service Layer**: Always use `RedisService` instead of direct client access

### 2. **Namespace Keys**: Use namespaces to organize different types of data

### 3. **Set TTL**: Always set appropriate TTL values for cached data

### 4. **Handle Errors**: Implement fallback behavior for Redis failures

### 5. **Monitor Health**: Use health check endpoints in production

### 6. **Batch Operations**: Use mget/mset for multiple key operations

## Testing

### Unit Tests

```typescript
import { RedisClientManager, RedisService } from '@/lib/redis-client';

beforeEach(() => {
  RedisClientManager.reset();
  RedisService.reset();
});
```

### Integration Tests

```typescript
// Test with actual Redis instance
const health = await sessionService.getHealthStatus();
expect(health.isHealthy).toBe(true);
```

## Performance Considerations

1. **Connection Pooling**: Single connection per application instance
2. **Command Batching**: Use pipeline operations for multiple commands
3. **TTL Management**: Automatic cleanup reduces memory usage
4. **Throttling**: Session touch operations are throttled to reduce load
5. **Error Circuit Breaking**: Failed connections don't retry excessively

## Security

1. **Secure Session IDs**: Cryptographically secure random generation
2. **Data Validation**: Schema validation for all session data
3. **Namespace Isolation**: Proper key namespacing prevents collisions
4. **Connection Security**: Support for Redis AUTH and SSL/TLS

This architecture provides a robust, maintainable, and scalable Redis implementation that follows software engineering best practices.
