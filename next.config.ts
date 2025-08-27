import type { NextConfig } from "next";
import { isDev } from '@/shared/constants/env';

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.54"],
  async rewrites() {
    if (isDev) {
      return [
        {
          // Match any versioned API like /api/v1/*, /api/v2/*, etc.
          source: "/api/v:version(\\d+)/:path*",
          destination: "http://localhost:5005/api/v:version/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
