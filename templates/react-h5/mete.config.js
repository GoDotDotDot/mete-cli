/* eslint-disable */
module.exports = {
  webpack: config => {
    // 解决antd moment 报 can't resolve ./locale 错误
    config.resolve.alias = {
      moment$: 'moment/moment.js',
    };

    return config;
  },
};
