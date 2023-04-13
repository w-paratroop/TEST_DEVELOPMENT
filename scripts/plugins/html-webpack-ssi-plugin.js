// https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://github.com/yanni4night/node-ssi/
const SSI = require('node-ssi');

/**
 * html-webpack-plugin へ SSI 機能追加するプラグイン
 * @see https://github.com/jantimon/html-webpack-plugin
 * @see https://github.com/yanni4night/node-ssi
 *
 * webpack@5 では `html-webpack-plugin@next` が必要 @see https://github.com/jantimon/html-webpack-plugin#install
 */
class HtmlWebpackSSIPlugin {
  /**
   * `node-ssi` option と等価の引数を取得し initial property へマージする
   * - baseDir: '' - ssi file directory
   * - encoding: 'utf-8'
   * - payload: {}
   * @param {*} options `node-ssi` option と等価
   */
  constructor(options = {}) {
    const initial = {
      baseDir: '',
      encoding: 'utf-8',
      payload: {},
    };
    this.options = { ...initial, ...options };

    this.ssi = new SSI(this.options);
    this.ssiProcessing = this.ssiProcessing.bind(this);
  }

  // TODO: DeprecationWarning: optimizeChunkAssets is deprecated (use Compilation.hooks.processAssets instead and use one of Compilation.PROCESS_ASSETS_STAGE_* as stage option)
  // https://webpack.js.org/api/compilation-hooks/#optimizechunkassets
  // https://webpack.js.org/api/compilation-hooks/#processassets
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackSSIPlugin', compilation => {
      // console.log('HtmlWebpackSSIPlugin', HtmlWebpackPlugin.getHooks)
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'HtmlWebpackSSIPlugin',
        this.ssiProcessing
      );
    });
  }

  ssiProcessing(data, callback) {
    if (data?.html) {
      this.ssi.compile(data.html, this.options, (error, content) => {
        if (!error) {
          data.html = content
        } else {
          console.error('[HtmlWebpackSSIPlugin] - error', error)
        }

        callback && callback(null, data)
      })
    } else {
      callback && callback(null, data)
    }
  }
}

module.exports = HtmlWebpackSSIPlugin;
