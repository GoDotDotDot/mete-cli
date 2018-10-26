/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { BUILD_DIR } = require('../../lib/constants');
// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

const workingPath = process.cwd();

module.exports = options => ({
  // entry: ['babel-polyfill', ...options.entry],
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(workingPath, BUILD_DIR),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,

  module: {
    rules: options.module.rules.concat([
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader'),
      },
      {
        test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: require.resolve('babel-loader'),
          options: options.babelQuery,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('svg-url-loader'),
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 8024,
            name: 'assets/fonts/[name].[ext]',
            publicPath: '/',
          },
        },
      },
      {
        test: /\.html$/,
        use: require.resolve('html-loader'),
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
          },
        },
      },
    ]),
  },
  mode: options.mode || 'development',
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.react.js', '.scss'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  stats: options.stats,
});
