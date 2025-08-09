import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Define the schema once
const serverShape = {
  // Database
  DATABASE_URL: z.url(),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),

  // Redis
  REDIS_URL: z.url(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_TOKEN: z.string().optional(),
} as const;

type InferServerEnv<S extends Record<string, unknown>> = {
  [K in keyof S]: string;
};

const shouldSkipValidation = process.env.SKIP_ENV_VALIDATION === 'true';

function buildUnvalidatedEnv<T extends Record<string, unknown>>(shape: T) {
  const entries = Object.keys(shape).map((key) => [
    key,
    process.env[key] ?? '',
  ]);
  return Object.fromEntries(entries) as InferServerEnv<T>;
}

export const env = shouldSkipValidation
  ? buildUnvalidatedEnv(serverShape)
  : createEnv({
      server: serverShape,
      experimental__runtimeEnv: process.env,
      emptyStringAsUndefined: true,
    });
