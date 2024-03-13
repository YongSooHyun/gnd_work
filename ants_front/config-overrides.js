const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    path: require.resolve('path-browserify'),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    
    buffer: require.resolve("buffer"),
    util: require.resolve("util"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
  return config;
};
