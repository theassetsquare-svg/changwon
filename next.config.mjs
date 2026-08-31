/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
