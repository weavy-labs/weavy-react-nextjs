/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  env: {
    WEAVY_URL: process.env.WEAVY_URL,    
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
