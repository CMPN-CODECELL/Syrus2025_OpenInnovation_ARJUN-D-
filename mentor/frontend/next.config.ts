import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.microlink.io",
      'images.unsplash.com', 
      'assets.aceternity.com' // Microlink Image Preview
    ]
  },
  /* config options here */
};

export default nextConfig;
