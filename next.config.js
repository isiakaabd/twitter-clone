/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: false,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
  },
  images: {
    domains: ["miro.medium.com", "lh3.googleusercontent.com"],
  },
});

module.exports = nextConfig;
