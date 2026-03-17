import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-46d80d5c-e5ae-40b0-a94d-59bad96de08a.space.z.ai',
    '.space.z.ai',
    'localhost',
  ],
};

export default nextConfig;
