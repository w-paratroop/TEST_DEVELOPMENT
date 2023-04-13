module.exports = {
  presets: [
    [
      // プリセットを指定することで、ES2018 を ES5 に変換
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          browsers: [
            'last 2 versions',
            'Safari >= 10',
            'Explorer >= 11',
            'last 4 Edge versions',
            'ChromeAndroid >= 18.0',
            'Android >= 6',
            'iOS >= 10.0',
          ],
        },
        useBuiltIns: 'usage',
        // @see https://babeljs.io/blog/2019/03/19/7.4.0
        // need core-js version
        corejs: 3,
      },
      // modules: false - IE Symbol polyfill not found error になる
      // 回避策 - babel-polyfill import + useBuiltIns: entry -> dev-client.bundle.js とコンフリクトの危険性
      // babelrc - "useBuiltIns": "usage" とし `{ modules: false }` 使用しない
      // { modules: false },
    ],
    // use react preset
    '@babel/preset-react',
  ],
  ignore: ['node_modules'],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },
};
