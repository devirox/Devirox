import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudinary and Unsplash hosts used by remote images. Prefer
    // `remotePatterns` (more secure) but keep `domains` for compatibility.
    domains: ["res.cloudinary.com", "images.unsplash.com", "source.unsplash.com"],
    remotePatterns: [
      // Cloudinary (any subdomain)
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
      // Unsplash CDN (images.unsplash.com)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Unsplash Source redirects (source.unsplash.com)
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
