'use strict';
// --------------------------------------
// server setting - webpack-dev-server@v4

// https://webpack.js.org/configuration/dev-server/#devserver
// https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
// --------------------------------------
// const path = require('path')

const settings = require('./settings');
const { port, directory } = settings;

/*
port 指定し起動します via `port.js`

directory

- src - 開発階層
- public - 依存ファイル
 */
module.exports = {
  devServer: {
    static: [
      {
        directory: directory.src,
        publicPath: '/',
        serveIndex: true,
        watch: true,
      },
      {
        directory: directory.public,
        publicPath: '/',
        serveIndex: true,
        watch: true,
      },
    ],
    watchFiles: [`${directory.src}/**/*`, `${directory.public}/**/*`],
    host: 'local-ip',
    port,
    // @since v0.6.2
    // [webpack-dev-server] "hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.
    // らしいのでコメントにする
    // hot: true,
    open: true,
    // open: ['/my-page'],
    // Enable gzip compression for everything served:
    compress: true,
    // http2: true,
    // directory indexes が有効にならないのでコメントアウトする
    // historyApiFallback: true,
    // Disable devServer.liveReload by setting it to false:
    // liveReload: false,
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
  },
};
