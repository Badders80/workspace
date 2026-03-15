import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.inspireracing.co.nz",
      },
      {
        protocol: "https",
        hostname: "loveracing.nz",
      },
      {
        protocol: "https",
        hostname: "www.baxltd.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
};

export default nextConfig;
