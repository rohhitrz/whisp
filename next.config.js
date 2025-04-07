/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir removed as it's now the default in Next.js 14+
  },
  sassOptions: {
    modules: true,
  },
  // Set the server to run on port 3002
  serverRuntimeConfig: {
    port: 3002,
  },
};

module.exports = nextConfig; 