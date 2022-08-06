/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    domains: ["miro.medium.com"],
  },
};

module.exports = nextConfig;
