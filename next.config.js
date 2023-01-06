const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  sassOptions: {
    prependData: `
      @import "./src/shared/styles/_mixins.scss";
    `,
  },
};

module.exports = nextConfig;
