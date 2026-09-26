import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use trailing slashes (/about/) like Django does. On Vercel this setting
  // applies to the whole deployment, including /admin/, so the two must agree
  // or the admin gets stuck in a redirect loop.
  trailingSlash: true,
  // Serve images as-is. With trailing slashes, Vercel's image optimizer URL
  // (/_next/image/) returns 404 for Services deployments, so the files in
  // src/assets are kept small instead.
  images: { unoptimized: true },
};

export default nextConfig;
