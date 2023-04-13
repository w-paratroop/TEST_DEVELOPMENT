'use strict';

// const path = require('path')

const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// ---
const middleware = require('../scripts-middleware');
const settings = require('./settings');
const { port } = settings;

// webpack-dev-server ignore
config.devServer = {};
const compiler = webpack(config);

// express setting
const app = express();

// app.set('port', port)

// static directory set
app.use(express.static(settings.directory.public));

// webpack - express
// app.use(webpackDevMiddleware(compiler))
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/',
    // serverSideRender: true,
    // logLevel: 'info',
  })
);
app.use(webpackHotMiddleware(compiler));

// -----------------------------------------------------------------------------------------
// middleware - request レスポンスを設定
middleware(app);

// -----------------------------------------------------------------------------------------

// 監視を開始する
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. Open up http://YOUR_IP:${port}/ in your browser.`
  );
});
