/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  // GitHub Pages project site: ayushshrivastava043.github.io/portfolio_website
  // Set NEXT_PUBLIC_BASE_PATH="" for Vercel root deploy
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/portfolio_website" : ""),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
