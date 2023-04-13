import Scrolling from './Scrolling';

/**
 * singleton instance, nullable
 * @type {?Scrolling}
 * @private
 */
let instance = null;

/**
 * Scrolling instance を singleton 提供します
 */
export default class ScrollingSingle {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * Scrolling instance を singleton を保証し作成します
   * @returns {Scrolling} Scrolling instance を返します
   */
  static factory() {
    if (instance === null) {
      instance = new Scrolling();
    }
    return instance;
  }
}
