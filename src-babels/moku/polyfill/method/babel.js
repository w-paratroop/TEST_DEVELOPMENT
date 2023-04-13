// IE
// Symbol 対応できない問題を解決するために...
// @see https://babeljs.io/docs/usage/polyfill/
// @see https://github.com/babel/babel-preset-env/issues/203
// IE 11 Symbol is not defined #203
// ```
// babel-preset-env includes plugins by default. To include polyfill you need:
// specify useBuiltIns: true in presets options (see more)
// include import "babel-polyfill" to your codebase.
// ```
// import '@babel/polyfill';
