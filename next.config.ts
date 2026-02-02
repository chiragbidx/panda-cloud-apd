import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Replacement for experimental.ppr
  cacheComponents: true,
  allowedDevOrigins: [
    'https://panda-cloud-apd-production.up.railway.app'
  ]
};

export default nextConfig;
