/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'github.com',
      },
    ],
  },
}

export default nextConfig
