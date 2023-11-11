import "./src/utils/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "resource-images-bucket-fastdnd.s3.amazonaws.com",
      "dnd-images-bucket.s3.amazonaws.com",
      "arweave.net",
      "shdw-drive.genesysgo.net",
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

export default nextConfig;
