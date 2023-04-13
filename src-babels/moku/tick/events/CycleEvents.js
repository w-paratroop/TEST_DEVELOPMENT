import Events from '../../event/Events';

/**
 * requestAnimationFrame を singleton 実行する {@link Cycle} Events
 */
export default class CycleEvents extends Events {
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
     * requestAnimationFrame 戻り値
     * @type {number}
     */
    this.id = -1;
    /**
     * animation time
     * @type {number}
     * @since 2018-01-20
     */
    this.time = 0;
  }
}
