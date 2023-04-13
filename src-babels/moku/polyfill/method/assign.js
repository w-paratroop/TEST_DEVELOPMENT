if (!Object.assign) {
  // Object.assign = require('object-assign');
  // @see https://github.com/ljharb/object.assign#readme
  Object.assign = require('object.assign/polyfill')();
}
