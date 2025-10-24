import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudinary host used by the hero image and other remote images
    domains: ["res.cloudinary.com", "images.unsplash.com", "source.unsplash.com"],
    // Remote patterns can be used for more flexible matching if needed
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.cloudinary.com',
    //   },
    // ],
  },
};

export default nextConfig;
