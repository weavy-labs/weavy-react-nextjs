/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  env: {
    WEAVY_SERVER: process.env.WEAVY_SERVER,    
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
