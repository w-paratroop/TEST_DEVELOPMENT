import Events from '../Events';

/**
 * {@link Wheel} Events, mouse wheel で発生するイベントを管理します
 */
export default class WheelEvents extends Events {
  /**
   * custom Event Object
   * @param {string} type イベント種類
   * @param {*} currentTarget current イベント発生インスタンス
   * @param {*} [target=undefined] イベント発生インスタンス
   * */
  constructor(type, currentTarget, target = undefined) {
    super(type, currentTarget, target);
    /**
     * 移動距離(px)
     * @type {number}
     */
    this.moved = 0;
  }
}
