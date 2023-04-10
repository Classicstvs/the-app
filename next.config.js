/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

module.exports =  nextConfig;


module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
  },
}

