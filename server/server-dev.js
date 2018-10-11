const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const devServerUtils = require('../lib/dev-utils/webpackDevServerUtils')
const errorOverlayMiddleware = require('../lib/dev-utils/error-overlay-middleware');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    logLevel: 'silent',
    stats: "errors-only"
  });
}

module.exports = function serverDev(app, webpackConfig, port, host) {
  const compiler =  devServerUtils.createCompiler(webpack, webpackConfig, port, host);

  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    overlay:true,
    log:false
  }));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('/mete/open-stack-frame-in-editor', errorOverlayMiddleware)

  app.get("*", (req, res) => {
    fs.readFile(path.join(compiler.outputPath, "index.html"), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
