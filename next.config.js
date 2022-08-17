/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: false,
  // theme: {
  //   extends: {
  //     screens: {
  //       sm: "250px",
  //       md: "320px",
  //       lg: "400px",
  //       xl: "768px",
  //     },
  //   },
  // },
  images: {
    domains: ["miro.medium.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
