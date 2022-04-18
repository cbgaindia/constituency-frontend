const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['echarts', 'zrender']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  compiler: {
    styledComponents: true,
    esmExternals: false,
  },
};

module.exports = withPlugins([withTM, withBundleAnalyzer], nextConfig);
