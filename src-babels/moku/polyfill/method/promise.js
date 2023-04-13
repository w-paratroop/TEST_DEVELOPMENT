// @see https://github.com/taylorhakes/promise-polyfill
// @see https://developers.google.com/web/fundamentals/getting-started/primers/promises
// > Chrome 32、Opera 19、Firefox 29、Safari 8、および Microsoft Edge - enabled
import Promise from 'promise-polyfill';

/**
 * Promise 未実装ブラウザへ polyfill します
 * - Chrome 32、Opera 19、Firefox 29、Safari 8、および Microsoft Edge - enabled
 * @see https://github.com/taylorhakes/promise-polyfill
 * @see https://developers.google.com/web/fundamentals/getting-started/primers/promises
 */
const activate = () => {
  // Promise: To add to window
  if (!window.Promise) {
    window.Promise = Promise;
  }
};

activate();

export default activate;
