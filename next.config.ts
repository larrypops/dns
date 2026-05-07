import type { NextConfig } from 'next';

const secureDistribution = process.env.CLOUDINARY_SECURE_DISTRIBUTION?.trim() || 'res.cloudinary.com';
const cloudinaryHost = secureDistribution.replace(/^https?:\/\//, '').split('/')[0];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cloudinaryHost,
      },
    ],
  },
};

export default nextConfig;
