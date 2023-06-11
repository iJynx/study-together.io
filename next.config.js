/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com", "study-overlay.vercel.app"],
  },
  async redirects() {
    return [
    ];
  },
};

module.exports = nextConfig;
