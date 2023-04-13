import PollingEvents from './PollingEvents';

/**
 * {@link Fps} Events
 */
export default class FpsEvents extends PollingEvents {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * custom Event Object
   * @param {string} type イベント種類
   * @param {*} currentTarget current イベント発生インスタンス
   * @param {*} [target=undefined] イベント発生インスタンス
   * */
  constructor(type, currentTarget, target = undefined) {
    super(type, currentTarget, target);
    // ---
    /**
     * fps - フレームレート値
     * @type {number}
     */
    this.fps = -1;
  }
}
