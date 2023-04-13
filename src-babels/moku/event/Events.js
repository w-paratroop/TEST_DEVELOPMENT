/**
 * custom Event のリスナー関数引数に送られる Event Object
 *
 * EventDispatcher.dispatch する時の引数として使用します
 *
 * 3つのプロパティは必須項目です、イベントにあわせプロパティを追加します
 *
 * - type: string, イベント種類
 * - target: *, イベント発生インスタンス
 * - currentTarget: *, current イベント発生インスタンス
 */
export default class Events {
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * custom Event Object
   * @param {string} type イベント種類
   * @param {*} [currentTarget=this] current イベント発生インスタンス
   * @param {*} [target=this] イベント発生インスタンス
   * */
  constructor(type, currentTarget = this, target = this) {
    /**
     * イベント種類
     * @type {string}
     */
    this.type = type;
    /**
     * target instance
     * @type {*}
     */
    this.target = target;
    /**
     * currentTarget instance
     * @type {*}
     */
    this.currentTarget = currentTarget;
  }

  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * 複製を作成します
   * @returns {Events|*} 複製を返します
   */
  clone() {
    // return new Events(this.type, this.currentTarget, this.target);
    // return Object.assign({}, this);
    return { ...this };
  }
}
