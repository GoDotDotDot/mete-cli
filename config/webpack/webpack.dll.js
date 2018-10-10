/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { join } = require('path')
const defaults = require('lodash/defaultsDeep')
const webpack = require('webpack');
const pkg = require(join(process.cwd(), 'package.json'))

if (!pkg.dllPlugin) { process.exit(0) }

const dllConfig = pkg.dllPlugin;
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = require('./webpack.base')({
  context: process.cwd(),
  entry: dllConfig.dlls,
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]',
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: join(process.cwd(), 'dll/[name]_manifest.json'),
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]',
    })
  ],
  performance: {
    hints: false,
  }
})
