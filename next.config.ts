import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
    ],
  },
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
