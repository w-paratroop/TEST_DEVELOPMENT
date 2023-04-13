/**
 * Android 4.3 以下
 * requestAnimationFrame 未実装なので polyfill する
 * babel-preset-env 補完しない？
 */
const animationFrame = () => {
  // native code check
  if (window.requestAnimationFrame && window.cancelAnimationFrame) {
    return;
  }
  // vendor prefix
  // const vendors = ['ms', 'moz', 'webkit', 'o'];
  // add vendor prefix
  ['ms', 'moz', 'webkit', 'o'].some((prefix) => {
    window.requestAnimationFrame = window[`${prefix}RequestAnimationFrame`];
    window.cancelAnimationFrame =
      window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`];
    // return false;
    return !!window.requestAnimationFrame;
  });
  // ------------------------------------------------
  // still check
  if (!window.requestAnimationFrame) {
    let lastTime = 0;
    window.requestAnimationFrame = (callback) => {
      const currentTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
      const id = setTimeout(() => {
        callback(currentTime + timeToCall);
      }, timeToCall);
      lastTime = currentTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
  }
};

animationFrame();

export default animationFrame;
