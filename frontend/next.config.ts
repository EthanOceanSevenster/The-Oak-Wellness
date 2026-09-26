import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use trailing slashes (/about/) like Django does. On Vercel this setting
  // applies to the whole deployment, including /admin/, so the two must agree
  // or the admin gets stuck in a redirect loop.
  trailingSlash: true,
};

export default nextConfig;
