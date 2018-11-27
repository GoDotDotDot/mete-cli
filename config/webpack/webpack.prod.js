// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const fs = require('fs');

const workingPath = process.cwd();
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(
  fs.readFileSync(path.resolve(workingPath, 'app/theme.less'), 'utf8'),
);

module.exports = require('./webpack.base')({
  // In production, we skip all hot-reloading stuff
  entry: {
    react_vendor: ['react', 'react-dom', 'react-router-dom'],
    redux_vendor: [
      'react-redux',
      'redux',
      'redux-immutable',
      'redux-saga',
      'immutable',
    ],
    app: path.join(process.cwd(), 'app/app.js'),
    // login: [ ...hotEntry, path.join(process.cwd(), 'app/pages/Login/index.js') ]
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: 'js/[name]-[chunkhash].bundle.js',
    chunkFilename: 'js/[id]-[chunkhash].bundle.js',
    publicPath: '/',
  },
  mode: 'production',
  module: {
    rules: [
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              minimize: true,
            },
          },
          require.resolve('postcss-loader'),
        ],
      },
      // scss loader
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              // module: true, // css-loader 0.14.5 compatible
              // modules: true
              // localIdentName: '[hash:base64:5]'
              // importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              // outputStyle: 'collapsed',
              sourceMap: false,
              includePaths: [path.resolve(workingPath, 'app')],
            },
          },
        ],
      },
      // less loader
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              // module: true, // css-loader 0.14.5 compatible
              // modules: true
              // localIdentName: '[hash:base64:5]'
              // importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              // outputStyle: 'collapsed',
              modifyVars: themeVariables,
              sourceMap: false,
              includePaths: [path.resolve(workingPath, 'app')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: '8024',
              name: '[name]-[hash].[ext]',
              publicPath: '/assets/images/',
              outputPath: 'assets/images',
            },
          },
          {
            loader: require.resolve('image-webpack-loader'),
            options: {
              disable: false,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: true,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/],
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name]-[contenthash].css' }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), './app/templates/index.pro.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    // minify remove some of the dead code
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     conditionals: true,
    //     unused: true,
    //     comparisons: true,
    //     sequences: true,
    //     dead_code: true,
    //     if_return: true,
    //     join_vars: true
    //   }
    // }),
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    // new OfflinePlugin({
    //   relativePaths: true,
    //   publicPath: './',

    //   // No need to cache .htaccess. See http://mxs.is/googmp,
    //   // this is applied before any match in `caches` section
    //   excludes: ['.htaccess'],

    //   caches: {
    //     main: [':rest:'],

    //     // All chunks marked as `additional`, loaded after main section
    //     // and do not prevent SW to install. Change to `optional` if
    //     // do not want them to be preloaded at all (cached only when first loaded)
    //     additional: ['*.bundle.js', '*.css'],
    //   },

    //   // Removes warning for about `additional` section usage
    //   safeToUseOptionalCaches: true,

    //   AppCache: false,
    // }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },
  isProd: true,
  stats: {
    assets: true,
    warnings: true,
    colors: {
      green: '\u001b[32m',
    },
  },
});
