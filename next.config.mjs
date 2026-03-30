/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // This fixes your specific error
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      // Add others as needed
    ],
  },
  output: "standalone",
};

export default nextConfig;