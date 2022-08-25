/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['echarts', 'zrender']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/state',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = buildConfig = (_phase) => {
  const plugins = [withBundleAnalyzer, withTM];
  const config = plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
  });
  return config;
};

// module.exports = withPlugins([withTM, withBundleAnalyzer], nextConfig);
