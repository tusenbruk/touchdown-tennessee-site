import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Article markdown is read from the filesystem at runtime; make sure the
  // content directory is traced into the serverless output for every route.
  outputFileTracingIncludes: {
    "/*": ["./content/articles/**/*"],
  },
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
