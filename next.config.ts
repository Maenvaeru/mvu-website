import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/mvu-website' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.boosty.to',
      },
    ],
  },
  transpilePackages: ['outstatic', 'next-navigation-guard'],
};

export default nextConfig;
