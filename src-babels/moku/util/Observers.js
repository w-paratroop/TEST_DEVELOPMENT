import 'intersection-observer';

/**
 * `IntersectionObserver` 表示されたかをチェックします
 */
export default class Observers {
  /**
   * `IntersectionObserver` callback
   * - `isIntersecting` property を使用し hit しているかを判定します
   * @param {Array<IntersectionObserverEntry>} entries `IntersectionObserverEntry` list
   * @see https://wiki.developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage
   * @see https://wiki.developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
   */
  check = (entries) => {
    entries.map((entry) => (entry.isIntersecting ? this.intersect(entry) : this.parallel(entry)));
  };

  /**
   * IntersectionObserver 準備します
   * @param {{root: ?HTMLElement, rootMargin: string, threshold: Array<number>}} [options={root: null, rootMargin: '0px', threshold: [0.5]}] `IntersectionObserver` option
   */
  constructor(
    options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5],
    }
  ) {
    /**
     * `IntersectionObserver` instance
     * @type {IntersectionObserver}
     */
    this.observer = new IntersectionObserver(this.check, options);

    /**
     * IntersectionObserver target element を保持します
     * @type {*[]}
     */
    this.elements = [];
  }

  /**
   * `IntersectionObserver` 処理を中断をおこなうために
   */
  destroy() {
    this.elements.map((element) => this.unobserve(element));
    this.disconnect();
  }

  /**
   * `IntersectionObserver.disconnect` 実行します
   */
  disconnect() {
    this.observer.disconnect();
  }

  /**
   * `disconnect` 実行を `elements`.length から判定します
   */
  shouldDisconnect() {
    if (!this.elements.length) {
      this.disconnect();
    }
  }

  /**
   * `IntersectionObserver.observe` 実行します
   * @param {HTMLElement} element 処理ターゲット
   */
  observe(element) {
    this.observer.observe(element);
    this.elements.push(element);
  }

  /**
   * `IntersectionObserver`.unobserve 実行します
   * @param {HTMLElement} element 処理ターゲット
   */
  unobserve(element) {
    this.observer.unobserve(element);
    // ---
    const { elements } = this;
    const index = elements.indexOf(element);
    elements.splice(index, 1);
    this.elements = [...elements];
    // ---
    this.shouldDisconnect();
  }

  /**
   * intersect 処理を行います - override し使用します
   * @param {IntersectionObserverEntry} entry hit object
   */
  intersect(entry) {
    console.log('Intersection.intersect - entry', entry);
  }

  /**
   * intersect から外れた処理を行います - override し使用します
   * @param {IntersectionObserverEntry} entry hit object
   */
  parallel(entry) {
    console.log('Intersection.parallel - entry', entry);
  }
}
