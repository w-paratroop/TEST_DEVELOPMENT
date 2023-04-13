import devices from '../devices';
import { getNumbersWithApp, getVersions, setBrowsersBuild, setBrowsersMajor } from './util';

/**
 * {@link devices}.browsers
 * {@link Edge}
 * @type {?object}
 * @since 0.4.2
 */
let browsers = null;

/**
 * version 情報を計算します
 * {@link Edge}
 * @since 0.4.2
 */
const version = () => {
  // const { app } = devices;
  // const numbers = app.match(/edga\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/i);
  // if (!Array.isArray(numbers)) {
  //   return;
  // }
  // // 先頭 削除
  // numbers.shift();
  // const versions = numbers.map((number, index) => {
  //   const int = parseInt(number, 10);
  //   if (index <= 3) {
  //     return Number.isNaN(int) ? 0 : int;
  //   }
  //   return null;
  // });
  // browsers.build = versions.join('.');
  // const [strMajor, strMinor, strBuild, strOption] = versions;
  // const major = parseInt(strMajor, 10);
  // let minor = 0;
  // if (versions.length >= 2) {
  //   minor = strMinor;
  // }
  // let build = '';
  // if (versions.length >= 3) {
  //   build = strBuild;
  // }
  // let option = '';
  // if (versions.length === 4) {
  //   option = strOption;
  // }
  // browsers.major = major;
  // browsers.version = parseFloat(`${major}.${minor}${build}${option}`);
  // browsers.numbers = versions;
  const numbers = getNumbersWithApp('EdgA');
  if (!numbers) {
    return;
  }
  // 先頭 削除
  numbers.shift();
  const versions = getVersions(numbers);
  browsers = setBrowsersBuild(browsers, numbers);
  browsers = setBrowsersMajor(browsers, versions);
};

/**
 * browser 判別します
 * {@link EdgA}
 * @since 0.4.2
 */
const init = () => {
  if (browsers) {
    return;
  }
  // browsers = Object.assign({}, devices.browsers);
  browsers = { ...{} };
  const { ua } = devices;
  const edge = !!ua.match(/edga/i);
  browsers.edga = edge;
  if (edge) {
    version();
  }
};

/**
 * EdgA detector
 * @since 0.4.2
 */
export default class EdgA {
  /**
   * 書き換え済み `browsers` を取得します
   * @returns {?Object} 書き換え済み `browsers` を返します
   */
  static browsers() {
    init();
    return browsers;
  }

  /**
   * Edge 判定
   * @returns {boolean} true: Edge
   */
  static is() {
    init();
    return browsers.edga;
  }

  /**
   * Edge Browser version
   * @returns {number} Edge version, not Android -1
   */
  static version() {
    init();
    return browsers.version;
  }

  /**
   * Edge Browser major version
   * @returns {number} Edge major version, not Android -1
   */
  static major() {
    init();
    return browsers.major;
  }

  /**
   * Edge Browser version `major.minor.build`
   * @returns {string} Edge version NN.NN.NN.NN 型（文字）で返します
   */
  static build() {
    init();
    return browsers.build;
  }

  /**
   * version を配列形式で取得します
   * @returns {Array.<number>} {{major: int, minor: int, build: int, option: number}} 形式で返します
   */
  static numbers() {
    init();
    return browsers.numbers;
  }
}
