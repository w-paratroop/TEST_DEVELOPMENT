import ScrollEvents from './ScrollEvents';

/**
 * {@link Resizing} Events
 */
export default class ResizingEvents extends ScrollEvents {
  /**
   * {@link Resizing} Events
   * @param {string} type イベント種類
   * @param {*} currentTarget current イベント発生インスタンス
   * @param {*} [target=undefined] イベント発生インスタンス
   */
  constructor(type, currentTarget, target = undefined) {
    super(type, currentTarget, target);
    // -----
    /**
     * body clientWidth
     * @type {number}
     */
    this.bodyWidth = 0;
    /**
     * body clientHeight
     * @type {number}
     */
    this.bodyHeight = 0;
  }
}
