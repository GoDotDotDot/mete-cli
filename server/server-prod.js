const path = require('path');
const express = require('express');
const compression = require('compression');

module.exports = function serverProd(app, webpackConfig) {
  try {
    const publicPath = webpackConfig.output.publicPath || '/';
    const outputPath = webpackConfig.output.path || path.resolve(process.cwd(), 'build');

    app.use(compression());
    app.use(publicPath, express.static(outputPath));

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
