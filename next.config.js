/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  /*   eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }, */
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  output: "standalone",
}

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
})

module.exports = withPWA(nextConfig)
