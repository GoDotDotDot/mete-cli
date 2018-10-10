/* eslint consistent-return:0 */

const express = require("express");
const chalk = require('chalk');
const signale = require('signale');
const argv = require("./argv");
const isDev = process.env.NODE_ENV !== "production";
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require("ngrok")
    : false;
const resolve = require("path").resolve;

const server = require("./server");
const uilts = require('../lib/utils')
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// // In production we need to pass these values in instead of relying on webpack
// setup(app, {
//   outputPath: resolve(process.cwd(), "build"),
//   publicPath: "/"
// });

// // get the intended host and port number, use localhost and port 3000 if not provided
// const customHost = argv.host || process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
// const prettyHost = customHost || "localhost";

// Start your app.

module.exports = function startServer(
  { dev = true },
  port,
  host="localhost"
) {
  // process.stdout.write('\033c')
  // console.log(chalk.green(`
  // Starting server in ${dev? 'development': 'production'}...
  // `)
  // ); 
  signale.start(`Starting server in ${dev? 'development': 'production'}...`)
  const app = express();
  server(app, dev,port,host);

  app.listen(port, host, err => {
    if (err) {
      if (err.code === "EADDRINUSE") {
        console.error(`
        Port ${port} is already in use.
        Please use ${chalk.bgBlue(" mete dev -p <port number> ")}
        
        `);
      }
      console.error(err);
      process.nextTick(() => process.exit(1));
      return;
    }
    // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(
        port,
        (innerErr, url) => {
          if (innerErr) {
            console.error(innerErr);
            return;
          }
          console.log(`
          Ngrok is running on ${url}.
          `);
        }
      );
    }
    chalk.green('✔️ Start server successful!')
  });
};
