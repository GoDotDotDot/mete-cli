const ip = require('ip');
const chalk = require('chalk');
const signale = require('signale');
const utils = require('../utils');

function showServerInfo (dev = true,port,host){
  utils.clearTerminal()
  console.log(`
  ${chalk.green('Compiled successfully!')}

  Mode: ${dev ? chalk.yellow('Development') : chalk.green('Production')}
  ${chalk.bold('Access URLs:')}
  Localhost: ${chalk.magenta(`http://${host}:${port}`)}
        LAN: ${chalk.magenta(`http://${ip.address()}:${port}\n`)+
  chalk.blue(`
  Press ${chalk.italic('CTRL-C')} to stop`)}
  `);
}

module.exports = showServerInfo