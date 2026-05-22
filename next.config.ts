import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/arcade",
        destination: "/tennessee-rifleman.html",
      },
      {
        source: "/rifleman",
        destination: "/tennessee-rifleman.html",
      },
      {
        source: "/catwalk",
        destination: "/touchdown-tennessee.html",
      },
    ];
  },
};

export default nextConfig;
