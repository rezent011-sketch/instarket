/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.serveousercontent.com', '*.loca.lt', 'localhost'],
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
