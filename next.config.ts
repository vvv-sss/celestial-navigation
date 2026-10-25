import type { NextConfig } from "next"

// The app is a fully static site. When built for GitHub Pages the repository
// name becomes the base path (https://<user>.github.io/celestial-navigation/).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
