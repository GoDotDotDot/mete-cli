const fs = require("fs");
const path = require("path");
const signale = require('signale');
const webpack = require('webpack')
// const FileSizeReporter = require('./utils/fileSizeReporter');

const { CONFIG_FILE } = require("../constants");

// const {measureFileSizesBeforeBuild,printFileSizesAfterBuild} = FileSizeReporter

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

function getExternalConfig() {
  const externalsCfg = path.resolve(process.cwd(), CONFIG_FILE);
  const exist = fs.existsSync(externalsCfg);
  if (exist) {
    return require(externalsCfg);
  }
};

function loadConfig(dev, externalsCfg) {
  let config;
  if (dev) {
    config = require("../../config/webpack/webpack.dev.js");
  } else {
    config = require("../../config/webpack/webpack.prod.js");
  }
  if (externalsCfg) {
    const customWebpackCfgFunc = externalsCfg.webpack;
    if (typeof customWebpackCfgFunc === "function") {
      return { ...config, ...customWebpackCfgFunc(config) };
    }
  }
  return { ...config };
};

function compile (config){
  return new Promise(async (resolve, reject) => {
    const webpackCompiler = webpack(config)
    webpackCompiler.run((err, stats) => {
      if (err) return reject(err)

      const jsonStats = stats.toJson('errors-only')

      if (jsonStats.errors.length > 0) {
        const error = new Error(jsonStats.errors[0])
        error.errors = jsonStats.errors
        error.warnings = jsonStats.warnings
        return reject(error)
      }
/**
 * TODO:
 * 需要美化输出结果
 */
      signale.success(`Buildding Successful!
      `)
      resolve()
    })
  })
}

async function build(dir) {
  try{
    const externalsCfg = getExternalConfig();
    const config = loadConfig(false, externalsCfg);
    config.output.path = dir;
    await compile(config)
  } catch(err){
    signale.error(`Failed to build.
    `)
    console.error(err);
    process.exit(1)
  }
};
module.exports.getExternalConfig = getExternalConfig
module.exports.loadConfig = loadConfig
module.exports.build = build

