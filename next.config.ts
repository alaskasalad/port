import type { NextConfig } from "next";

const basePath = "/port";

const nextConfig: NextConfig = {
  /* config options here */
  basePath,
  // Static export on GitHub Pages has no image optimizer, so images are served as-is.
  images: { unoptimized: true },
  // Lets the code add the base path to plain URLs (cursor files, the resume link).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
