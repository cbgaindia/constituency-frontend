const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM();

module.exports = {
  styledComponents: true,
};
