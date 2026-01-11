import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dallalonga.it',
      },
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.b2bpic.net',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
    qualities: [75, 90],
  },
};

export default nextConfig;
