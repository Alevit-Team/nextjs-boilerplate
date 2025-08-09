import type { NextConfig } from 'next';

// Conditionally validate environment variables during build.
// Set SKIP_ENV_VALIDATION=true in CI to bypass validation when secrets are unavailable.
console.log('process.env.SKIP_ENV_VALIDATION', process.env.SKIP_ENV_VALIDATION);
console.log(
  'process.env.SKIP_ENV_VALIDATION !== "true"',
  process.env.SKIP_ENV_VALIDATION !== 'true'
);
if (process.env.SKIP_ENV_VALIDATION !== 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./src/env/server');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('./src/env/client');
}

const nextConfig: NextConfig = {};

export default nextConfig;
