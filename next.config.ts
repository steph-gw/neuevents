import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/perks", destination: "/perks-and-benefits", permanent: true },
      { source: "/ideas", destination: "/tips-ideas", permanent: true },
      { source: "/travel", destination: "/services#travel-services", permanent: true },
      { source: "/gallery/events", destination: "/gallery", permanent: false },
      { source: "/gallery/weddings", destination: "/gallery", permanent: false },
    ];
  },
  devIndicators: false,
  images: {
    qualities: [75, 84, 85, 90, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.showit.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
