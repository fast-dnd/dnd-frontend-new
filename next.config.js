/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "resource-images-bucket-fastdnd.s3.amazonaws.com",
      "dnd-images-bucket.s3.amazonaws.com",
      "shdw-drive.genesysgo.net",
    ],
  },
};

module.exports = nextConfig;
