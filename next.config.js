/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnails.roblox.com',
      },
    ],
  },
}
module.exports = nextConfig
