import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This app lives inside the legacy repo; pin the root so Turbopack ignores the parent lockfile.
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  // The persistent dev cache kept serving stale server renders after edits (old markup with new client
  // code → hydration mismatches), so dev rebuilds from source each start. Production builds are unaffected.
  experimental: { turbopackFileSystemCacheForDev: false },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
