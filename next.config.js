/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "resource-images-bucket-fastdnd.s3.amazonaws.com",
      "dnd-images-bucket.s3.amazonaws.com",
    ],
  },
  webpack: (config, {}) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
};

module.exports = nextConfig;
