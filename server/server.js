const chalk = require('chalk');
const serverDev = require('./server-dev');
const serverProd = require('./server-prod');
const webpackBuild = require('../lib/build-utils/webpack')

const CONFIG_FILE = require('../lib/constants');

module.exports = (app, dev,port,host) => {
  // 需要加载webpack配置
  const externalCfg = webpackBuild.getExternalConfig();
  const webpackConfig = webpackBuild.loadConfig(dev, externalCfg);
  if (dev) {
    if(externalCfg){
      chalk.green(`Using Custom Config: ${CONFIG_FILE}`);
    }
    serverDev(app,webpackConfig,port,host)
  } else {
    serverProd(app, webpackConfig, port, host)
  }

  return app
}
