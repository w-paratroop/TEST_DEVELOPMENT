import Events from '../Events';

/**
 * drag events
 * @since v0.4.4
 */
export default class DragEvents extends Events {
  /**
   * drag events
   * @param {string} type event type
   * @param {*} currentTarget currentTarget instance
   * @param {*} target target instance
   * @param {number} x drag px
   */
  constructor(type, currentTarget, target, x) {
    super(type, currentTarget, target);
    /**
     * drag px
     * @type {number}
     */
    this.x = x;
  }
}
