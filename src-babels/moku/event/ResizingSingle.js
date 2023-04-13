import Resizing from './Resizing';

/**
 * singleton Resizing instance
 * @type {?Resizing}
 */
let instance = null;

/**
 * Resizing instance を singleton 提供します
 */
export default class ResizingSingle {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * Resizing instance を singleton 提供します
   * @returns {Resizing} Resizing instance
   */
  static factory() {
    if (!instance) {
      instance = new Resizing();
    }
    return instance;
  }
}
