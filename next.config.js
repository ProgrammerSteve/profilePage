/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tailwindui.com",
      "assets.vercel.com",
      "cdn.chec.io",
      "www.w3.org",
      "testbucket17320.s3.amazonaws.com",
      "www.testbucket17320.s3.amazonaws.com",
      "s3.amazonaws.com",
      "https://testbucket17320.s3.amazonaws.com/*",
      "https://testbucket17320.s3.amazonaws.com/public/*",
      "https://www.testbucket17320.s3.amazonaws.com/*",
      "https://www.testbucket17320.s3.amazonaws.com/public/*",
    ],
    formats: ["image/avif", "image/webp"],
    // dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
