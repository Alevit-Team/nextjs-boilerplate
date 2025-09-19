import { NextResponse } from 'next/server';
import { sessionService } from '@/lib/services/session-service';

/**
 * Redis health check endpoint
 * Provides detailed health information about Redis connection and services
 */
export async function GET() {
  try {
    const healthStatus = await sessionService.getHealthStatus();

    const response = {
      status: healthStatus.isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'redis',
      details: {
        session_service: healthStatus.isHealthy,
        redis_connection: healthStatus.redisHealth,
        error: healthStatus.error,
      },
    };

    return NextResponse.json(response, {
      status: healthStatus.isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    const errorResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'redis',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: null,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
