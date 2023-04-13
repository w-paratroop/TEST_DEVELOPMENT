'use strict';
// --------------------------------------
// DEV - webpack
// --------------------------------------

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
// @see https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const Fiber = require('fibers');

const pkg = require('../package');
const settings = require('./settings');
const server = require('./webpack.server.config');

// --------------------------------------
const HtmlWebpackSSIPlugin = require('./plugins/html-webpack-ssi-plugin');
// --------------------------------------
const ESLintPlugin = require('eslint-webpack-plugin');
// --------------------------------------
const mode = 'development';

const config = {
  // @see https://webpack.js.org/configuration/other-options/#cache
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  mode,
  target: ['web', 'es5'],
  entry: settings.entries,
  output: {
    // path: settings.directory.app,
    path: settings.directory.src,
    publicPath: '/',
    chunkFilename: 'assets/js/[name].chunk.js',
  },
  module: {
    rules: [
      {
        oneOf: [
          // ------------------------------------
          // babel
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: [/node_modules/],
            use: [
              {
                // Babel を利用する
                loader: 'babel-loader',
                // Babel のオプションを指定する
                options: {
                  cacheDirectory: true,
                }, // options
              },
            ], // use
          },
          // ------------------------------------
          // module scss
          {
            test: /\.(sa|sc|c)ss$/,
            include: /\.module\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  // importLoaders: 1,
                  // @see https://webpack.js.org/loaders/css-loader/#object-2
                  modules: {
                    localIdentName: '[path][name]__[local]',
                    // auto: true,
                  },
                  url: false,
                  // ソースマップの利用有無
                  sourceMap: true,
                  // 0 => no loaders (default);
                  // 1 => postcss-loader;
                  // 2 => postcss-loader, sass-loader
                  importLoaders: 2,
                },
              },
              // postCss - autoprefixer
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // ソースマップの利用有無
                  sourceMap: true,
                  postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-import'),
                      require('postcss-flexbugs-fixes'),
                      autoprefixer(settings.autoprefixer),
                    ],
                  },
                },
              },
              // https://webpack.js.org/loaders/sass-loader/
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sassOptions: {
                    // fiber: Fiber,
                    fiber: false,
                  },
                  implementation: require('sass'),
                  // ソースマップの利用有無
                  sourceMap: true,
                },
              },
            ],
          },
          // ------------------------------------
          // sass / scss
          {
            test: /\.(sa|sc|c)ss$/,
            exclude: /\.module\.scss$/,
            use: [
              // linkタグに出力する機能
              // require.resolve('style-loader'),
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/',
                },
              },
              // CSSをバンドルするための機能
              {
                loader: require.resolve('css-loader'),
                options: {
                  // オプションでCSS内のurl()メソッドの取り込みを禁止する
                  // @since 2021-03-18 font-face url error になるので default false にする
                  // false にすると scss url() image が出力されないが develop は false のママ運用する
                  // url: true,
                  url: false,
                  // ソースマップの利用有無
                  sourceMap: true,
                  // 0 => no loaders (default);
                  // 1 => postcss-loader;
                  // 2 => postcss-loader, sass-loader
                  importLoaders: 2,
                },
              },
              // postCss - autoprefixer
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // ソースマップの利用有無
                  sourceMap: true,
                  postcssOptions: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-import'),
                      require('postcss-flexbugs-fixes'),
                      autoprefixer(settings.autoprefixer),
                    ],
                  },
                },
              },
              // https://webpack.js.org/loaders/sass-loader/
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sassOptions: {
                    // fiber: Fiber,
                    fiber: false,
                  },
                  implementation: require('sass'),
                  // ソースマップの利用有無
                  sourceMap: true,
                },
              },
            ],
          },
          // ------------------------------------
          // img
          // {
          //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          //   loader: require.resolve('url-loader'),
          //   options: {
          //     limit: 1024 * 8,
          //     name: '[path][name].[hash:8].[ext]',
          //     // outputPath: (url, resourcePath, context) => {
          //     outputPath: url => {
          //       return url.replace('src/', '');
          //     },
          //     publicPath: '',
          //   },
          // },
          // -------------------
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            // include: [
            //   path.resolve(__dirname, '../../assets/img'),
            // ],
            use: [
              {
                loader: require.resolve('file-loader'),
                options: {
                  // name: 'assets/img/[name].[hash:8].[ext]',
                  name: '[path][name].[hash:8].[ext]',
                  // outputPath: (url, resourcePath, context) => {
                  outputPath: (url) => {
                    return url.replace('src/', '');
                  },
                  publicPath: '',
                },
              },
            ],
          },
        ],
      },
    ], // rules
  }, // modules
  performance: {
    hints: false,
  },
  devtool: 'source-map',
  plugins: [
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        BUILD_VERSION: JSON.stringify(pkg.version),
        BUILD_TIME: JSON.stringify(new Date().toLocaleString()),
      },
    }),
    // ---
    ...settings.htmlList,
    // ssi 必要な時はコメントを外します
    // new HtmlWebpackSSIPlugin({ baseDir: settings.directory.public }),
    // ---
    new RemoveEmptyScriptsPlugin(),
    // ---
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
};

config.devServer = server.devServer;

module.exports = config;
