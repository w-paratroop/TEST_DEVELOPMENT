// events
import Events from '../Events';

// util
import Vectors from '../../util/Vectors';

/**
 * {@link Touching} Events
 */
export default class TouchingEvents extends Events {
  /**
   * Touching events object 各プロパティを設定します
   * @param {string} type event type
   * @param {*} target イベント発生インスタンス
   * @param {Event} origin 発生時のオリジナルイベント
   * @param {Vectors} current 現在の位置
   * @param {Vectors} between 前回位置との差
   * @param {boolean} scrolling scroll したかの真偽値, true: scroll している
   */
  constructor(
    type,
    target,
    origin,
    current = new Vectors(),
    between = new Vectors(),
    scrolling = false
  ) {
    // super
    super(type, target);
    /**
     * 発生時のオリジナルイベント
     * @type {Event}
     */
    this.origin = origin;
    /**
     * 現在の位置
     * @type {Vectors}
     */
    this.current = current;
    /**
     * 前回位置との差
     * @type {Vectors}
     */
    this.between = between;
    /**
     * scroll したかの真偽値
     * @type {boolean}
     */
    this.scrolling = scrolling;
  }
}
