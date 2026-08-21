import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
      {
        protocol: "https",
        hostname: "files.cdn.printful.com",
      },
    ],
  },
  async redirects() {
    // The editorial era: old news URLs go home permanently.
    return [
      { source: "/archive", destination: "/", permanent: true },
      { source: "/article/:slug*", destination: "/", permanent: true },
      { source: "/vols/:path*", destination: "/", permanent: true },
      { source: "/titans/:path*", destination: "/", permanent: true },
      { source: "/feed.xml", destination: "/", permanent: true },
    ];
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
