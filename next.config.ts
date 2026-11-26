import type { NextConfig } from "next";

/**
 * `NEXT_DIST_DIR` lets a second process (automated builds and test servers) use its own output folder, so it
 * never collides with a dev server that is running on `.next`.
 */
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // The blog used to live at /insights.
  async redirects() {
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:path*", destination: "/blog/:path*", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // TODO: replace with approved UMS photography; remove Unsplash once done.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
