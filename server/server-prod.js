const path = require('path');
const express = require('express');
const compression = require('compression');
const signale = require('signale');
const chalk = require('chalk');

function checkPrefixWithDot(path){
  const reg = /^(\.)+/g;
  if(reg.test(path)){
    let filterPath = '';
    filterPath = path.replace(reg, '');
    signale.warn(`Detected the publicPath in webpack has the dot prefix and the dot will be ignored in production server mode for static file serve. The orignal path ${chalk.green(path)} will be replaced with ${chalk.green(filterPath)} .`);
    return filterPath;
  }
  return path;
}

module.exports = function serverProd(app, webpackConfig) {
  try {
    const publicPath = webpackConfig.output.publicPath || '/';
    const outputPath = webpackConfig.output.path || path.resolve(process.cwd(), 'build');
    app.use(compression());
    app.use(checkPrefixWithDot(publicPath), express.static(outputPath));

    app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
  } catch (err) {
    console.error(`
    Error happend! Maybe you override path or publicPath at output property in your webpack config!
    
    Origin Error Stack:
        ${err}
    `);
    process.exit(1);
  }
};
