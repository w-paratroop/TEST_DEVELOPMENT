'use strict';
// --------------------------------------
// DEV - BUILD
// --------------------------------------
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
// For webpack v5 or above please use css-minimizer-webpack-plugin instead.
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

// https://webpack.js.org/plugins/image-minimizer-webpack-plugin/
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// ------------------------------------------------------
const pkg = require('../package');
const settings = require('./settings');
const server = require('./webpack.server.config');
// ------------------------------------------------------
console.log(`build start - ${new Date().toLocaleString()}`);
console.log('you can check by `serve`.');
console.log(
  `serve -p ${parseInt(settings.port, 10) + 1}  ./${settings.directory.dist.split('/').pop()}`
);
// ------------------------------------------------------
const mode = 'production';

const svgo = {
  // https://github.com/svg/svgo#built-in-plugins
  // https://github.com/svg/svgo#configuration
  plugins: [
    // cleanup attributes from newlines, trailing, and repeating spaces
    'cleanupAttrs',
    // remove doctype declaration
    'removeDoctype',
    // remove XML processing instructions
    'removeXMLProcInst',
    // remove comments
    'removeComments',
    // remove <metadata>
    'removeMetadata',
    // remove <title>
    'removeTitle',
    // remove <desc>
    'removeDesc',
    // remove elements of <defs> without id
    'removeUselessDefs',
    // remove editors namespaces, elements, and attributes
    'removeEditorsNSData',
    // remove empty attributes
    'removeEmptyAttrs',
    // remove empty Text elements
    'removeEmptyText',
    // remove empty Container elements
    'removeEmptyContainers',
    // remove unknown elements content and attributes, remove attributes with default values
    // 'removeUnknownsAndDefaults',
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        keepDataAttrs: false,
      },
    },
    // remove unused namespaces declaration
    'removeUnusedNS',
    // minify <style> elements content with CSSO
    'minifyStyles',
    // xmlns="http://www.w3.org/2000/svg" という記述を除去
    { removeXMLNS: true },
    // viewBox の外側の要素を削除
    { removeOffCanvasPaths: true },
    // viewBoxが存在する場合はwidth / height属性を削除
    { removeDimensions: true },
    // reusePaths
    { reusePaths: true },
  ],
  verbose: true,
};

const config = {
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
    path: settings.directory.dist,
    publicPath: '/',
    chunkFilename: 'assets/js/[name].chunk.js',
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        exclude: settings.ignoreJs,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        parallel: true,
        // @since v0.5.0 JS size が若干小さくなるので true default へ変更
        // js.LICENSE.txt 納品すること
        extractComments: true,
        // false: *.js.LICENSE output しない
        // extractComments: false,
      }),
      new CssMinimizerPlugin({
        exclude: settings.ignoreCss,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              autoprefixer: false,
              zindex: false,
              reduceIdents: false,
            },
          ],
        },
      }),
      // @since v0.6.0
      new ImageMinimizerPlugin({
        test: /\.(jpe?g|png|gif)$/i,
        minimizer: {
          filter: (source, sourcePath) => {
            // The `source` argument is a `Buffer` of source file
            // The `sourcePath` argument is an absolute path to source
            console.log(
              `img optimize: ${!settings.ignoreImages.includes(sourcePath)}, `,
              sourcePath
            );
            // 除外リストに含まれるパスを除く true: 圧縮する
            return !settings.ignoreImages.includes(sourcePath);
          },
          // https://webpack.js.org/plugins/image-minimizer-webpack-plugin/#optimize-with-squoosh
          // For lossy optimization we recommend using the default settings of @squoosh/lib package. The default values and supported file types for each option can be found in the codecs.ts file under codecs.
          // https://github.com/GoogleChromeLabs/squoosh/blob/dev/libsquoosh/src/codecs.ts
          implementation: ImageMinimizerPlugin.squooshMinify,
        },
      }),
      new ImageMinimizerPlugin({
        test: /\.(svg)$/i,
        minimizer: {
          filter: (source, sourcePath) => {
            // The `source` argument is a `Buffer` of source file
            // The `sourcePath` argument is an absolute path to source
            console.log(
              `svg optimize: ${!settings.ignoreImages.includes(sourcePath)}, `,
              sourcePath
            );
            // 除外リストに含まれるパスを除く true: 圧縮する
            return !settings.ignoreImages.includes(sourcePath);
          },
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: ['imagemin-svgo'],
            encodeOptions: {
              // svgo,
              plugins: {
                name: 'preset-default',
              },
            },
          },
        },
      }),
    ],
    // NamedModulesPlugin deprecated - instead use... https://webpack.js.org/configuration/optimization/
    // namedModules: true,
    // @since webpack5 - `optimization.namedModules: true ↦ optimization.moduleIds: 'named'`
    // @see https://webpack.js.org/migrate/5/
    moduleIds: 'named',
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
              // MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  // importLoaders: 1,
                  // @see https://webpack.js.org/loaders/css-loader/#object-2
                  modules: {
                    localIdentName: '[local]__[hash:base64]',
                    // auto: true,
                  },
                  url: false,
                  // ソースマップの利用有無
                  sourceMap: false,
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
                  sourceMap: false,
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
                  sourceMap: false,
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
              // require.resolve('resolve-url-loader'),
              // CSSをバンドルするための機能
              {
                loader: require.resolve('css-loader'),
                options: {
                  // オプションでCSS内のurl()メソッドの取り込みを禁止する
                  // @since 2021-03-18 font-face url error になるので default false にする
                  // false にすると scss url() image が出力されないので true へ戻す
                  // false - イキにする
                  // url: true,
                  url: false,
                  // ソースマップの利用有無
                  // sourceMap: true,
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
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  // ident: 'postcss',
                  // sourceMap: true,
                  postcssOptions: {
                    plugins: () => [
                      require('postcss-import'),
                      require('postcss-flexbugs-fixes'),
                      autoprefixer(settings.autoprefixer),
                    ],
                  },
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  implementation: require('sass'),
                  // https://webpack.js.org/loaders/sass-loader/#object
                  // 展開が必要な時は outputStyle: 'expanded' へ変更
                  sassOptions: {
                    outputStyle: 'compressed',
                  },
                },
              },
            ],
          },
          // ------------------------------------
          // @since 20210507 - url-loader から file-loader へ移行する
          // base64 include を希望の時は url-loader を使用する
          // img
          // {
          //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.(woff|woff2|eot|ttf)$/],
          //   exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
          //   use: [
          //     {
          //       // loader: 'url-loader',
          //       loader: require.resolve('url-loader'),
          //       options: {
          //         // inline 変換したくない時は `1` へ変更します
          //         limit: 1024 * 8,
          //         // name: '[path][name].[hash:8].[ext]',
          //         name: '[path][name].[ext]',
          //         // outputPath: (url, resourcePath, context) => {
          //         outputPath: url => {
          //           console.log('url-loader', url);
          //           return url.replace('src/', '');
          //         },
          //         publicPath: '',
          //       },
          //     },
          //     {
          //       loader: 'img-loader',
          //       options: {
          //         plugins: [
          //           require('imagemin-gifsicle')({
          //             interlaced: false,
          //             verbose: true,
          //           }),
          //           require('imagemin-mozjpeg')({
          //             progressive: false,
          //             arithmetic: false,
          //             quality: 90,
          //             verbose: true,
          //           }),
          //           require('imagemin-pngquant')({
          //             floyd: 0.5,
          //             speed: 1,
          //             quality: [0.8, 0.9],
          //             verbose: true,
          //           }),
          //           require('imagemin-svgo')(svgoOptions),
          //         ],
          //       },
          //     },
          //   ],
          // },
          // -------------------
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.(woff|woff2|eot|ttf)$/],
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            // include: [
            //   path.resolve(__dirname, '../../assets/img'),
            // ],
            use: [
              {
                loader: require.resolve('file-loader'),
                options: {
                  // name: 'assets/img/[name].[hash:8].[ext]',
                  // name: '[path][name].[hash:8].[ext]'
                  name: '[path][name].[ext]',
                  // outputPath: (url, resourcePath, context) => {
                  outputPath: (url) => {
                    console.log('file-loader', url);
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
    hints: 'warning',
    // int (in bytes)
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  // devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    // new FixStyleOnlyEntriesPlugin(),
    new RemoveEmptyScriptsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        BUILD_VERSION: JSON.stringify(pkg.version),
        BUILD_TIME: JSON.stringify(new Date().toLocaleString()),
      },
    }),
    // ---
    ...settings.htmlList,
    // new webpack.NamedModulesPlugin(),
    // ---
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        // copy public to dist
        {
          from: settings.directory.public,
          to: settings.directory.dist,
          globOptions: {
            ignore: [
              // _ 付き directory files
              `${settings.directory.public}/**/_*/*`,
              // _ 先頭 `_` filename files
              `${settings.directory.public}/**/_*`,
            ],
          },
        },
        // copy src to dist
        {
          from: settings.directory.src,
          to: settings.directory.dist,
          filter(resourcePath) {
            // 有効な拡張子
            const img = [
              'bmp',
              'gif',
              'jpg',
              'jpeg',
              'png',
              'pdf',
              'svg',
              'ico',
              'mp4',
              'mov',
              'woff',
              'woff2',
              'ttf',
              'eot',
              'webmanifest',
              'xml',
            ];
            // resourcePath 拡張子
            const ext = resourcePath.split('.').pop();
            return img.includes(ext);
          },
        },
      ],
    }),
  ],
};

config.devServer = server.devServer;
config.devServer.quiet = true;

module.exports = config;
