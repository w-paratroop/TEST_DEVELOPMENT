import Events from '../Events';

/**
 * {@link Rising} Events
 */
export default class RisingEvents extends Events {
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
     * 衝突判定, true: 衝突
     * @type {boolean}
     */
    this.hit = false;
    /**
     * original event
     * @type {?Event|*}
     */
    this.original = null;
    /**
     * ClientRect
     * @type {?ClientRect}
     */
    this.offset = null;
  }
}
