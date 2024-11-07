/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

import createMDX from '@next/mdx';
const withMDX = createMDX({});

export default withMDX(nextConfig);
