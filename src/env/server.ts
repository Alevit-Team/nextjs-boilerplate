import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.url(),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DB: z.string().min(1),

    // Redis
    REDIS_URL: z.url(),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_TOKEN: z.string().optional(),

    // Session
    SESSION_TOUCH_INTERVAL_SECONDS: z.coerce
      .number()
      .int()
      .positive()
      .optional(),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
