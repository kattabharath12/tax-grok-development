const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove custom distDir and output for Railway
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    domains: ['railway.app'] // Add Railway domain
  },
  // Add serverRuntimeConfig for Railway
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
};

module.exports = nextConfig;
