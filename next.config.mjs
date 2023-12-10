import WithPWA from "@ducanh2912/next-pwa";
import NextBundleAnalyzer from "@next/bundle-analyzer";

import "./src/utils/env.mjs";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = WithPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resource-images-bucket-fastdnd.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "dnd-images-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "arweave.net",
      },
      {
        protocol: "https",
        hostname: "shdw-drive.genesysgo.net",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", {
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
};

export default withPWA(withBundleAnalyzer(nextConfig));
