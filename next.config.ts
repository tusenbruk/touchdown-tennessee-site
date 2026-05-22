import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/arcade",
        destination: "/touchdown-tennessee.html",
      },
    ];
  },
};

export default nextConfig;
