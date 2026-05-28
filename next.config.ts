import type { NextConfig } from "next";

const securityHeaders = [
  // Blocca clickjacking — il sito può essere embeddato solo da sé stesso
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Blocca MIME sniffing — fondamentale per Content-Security
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Invia referrer completo solo a stessa origine, solo origine altrove
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Abilita DNS prefetch per performance
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Blocca accesso a camera/microfono/geolocation non necessario
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  // HSTS già gestito da Vercel, lo rafforziamo con includeSubDomains
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Applica security headers a tutte le route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
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
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
