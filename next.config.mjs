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
    ],
  },
}

export default nextConfig
