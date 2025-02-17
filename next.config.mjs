/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // React의 Strict Mode 활성화
  experimental: {
    //reactRefresh: true, // Fast Refresh 강제 활성화
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
