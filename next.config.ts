import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skilltestnextjs.evidam.zybotechlab.com",
        port: "",
        pathname: "/media/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination:
          "https://skilltestnextjs.evidam.zybotechlab.com/api/:path*/",
      },
    ]
  },
}

export default nextConfig
