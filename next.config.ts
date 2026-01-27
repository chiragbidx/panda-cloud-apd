import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Replacement for experimental.ppr
  cacheComponents: true,
};

export default nextConfig;
