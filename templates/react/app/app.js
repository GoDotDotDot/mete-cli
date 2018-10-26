/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';

import history from './common/history';
// import 'sanitize.css/sanitize.css';

// Import root app
import App from './app.layout';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import './assets/images/favicon.ico';
import './assets/images/icon-72x72.png';
import './assets/images/icon-96x96.png';
import './assets/images/icon-120x120.png';
import './assets/images/icon-128x128.png';
import './assets/images/icon-144x144.png';
import './assets/images/icon-152x152.png';
import './assets/images/icon-167x167.png';
import './assets/images/icon-180x180.png';
import './assets/images/icon-192x192.png';
import './assets/images/icon-384x384.png';
import './assets/images/icon-512x512.png';
import './manifest.json';
// import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */
import './i18n';
import configureStore from './configureStore';

// Import CSS reset and Global Styles
// import './global-styles';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  },
);

// Create redux store with history
const initialState = {};

const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    // eslint-disable-next-line
    resolve(import('intl'));
  })
    .then(() =>
      // eslint-disable-next-line
      Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/zh.js')]),)
    .then(() => render())
    .catch((err) => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
