import NativeResizing from './NativeResizing';

/**
 * singleton Resizing instance
 * @type {?NativeResizing}
 */
let instance = null;

/**
 * Resizing instance を singleton 提供します
 */
export default class NativeResizingSingle {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * NativeResizing instance を singleton 提供します
   * @returns {NativeResizing} NativeResizing instance
   */
  static factory() {
    if (!instance) {
      instance = new NativeResizing();
    }
    return instance;
  }
}
