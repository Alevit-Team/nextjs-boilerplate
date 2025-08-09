import '@/env/load-externally';
import { env } from '@/env/server';

console.log('🔍 Debugging environment variables...');
console.log('DATABASE_URL:', env.DATABASE_URL);
console.log('POSTGRES_USER:', env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB:', env.POSTGRES_DB);
console.log('REDIS_URL:', env.REDIS_URL);
console.log('REDIS_PASSWORD:', env.REDIS_PASSWORD);

console.log('\n🔍 Raw process.env values:');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
console.log('REDIS_URL:', process.env.REDIS_URL);
console.log('REDIS_PASSWORD:', process.env.REDIS_PASSWORD);
console.log(
  'SESSION_TOUCH_INTERVAL_SECONDS:',
  process.env.SESSION_TOUCH_INTERVAL_SECONDS
);
