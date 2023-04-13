import devices from '../devices';
import CriOS from './CriOS';
import Edge from './Edge';
import Chrome from './Chrome';
import FxiOS from './FxiOS';
import Android from '../os/Android';
import EdgiOS from './EdgiOS';
import EdgA from './EdgA';
import { getNumbersWithApp, getVersions, setBrowsersBuild, setBrowsersMajor } from './util';

/**
 * {@link devices}.browsers
 * {@link Safari}
 * @type {?object}
 * @since 0.4.2
 */
let browsers = null;

/**
 * version 情報を計算します
 * {@link Safari}
 * @since 0.4.2
 */
const version = () => {
  // const { app } = devices;
  // const numbers = app.match(/version\/(\d+)\.(\d+)\.?(\d+)?/i);
  // if (!Array.isArray(numbers)) {
  //   return;
  // }
  // // 先頭 削除
  // numbers.shift();
  // // array
  // const intArr = numbers.map(number => parseInt(number, 10));
  // const versions = intArr.filter(int => !Number.isNaN(int));
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
  const numbers = getNumbersWithApp('Safari');
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
 * {@link Safari}
 * @since 0.4.2
 */
const init = () => {
  if (browsers) {
    return;
  }
  // browsers = Object.assign({}, devices.browsers);
  browsers = { ...{} };
  let { safari } = devices;
  if (
    CriOS.is() ||
    Edge.is() ||
    Chrome.is() ||
    FxiOS.is() ||
    EdgiOS.is() ||
    EdgA.is() ||
    Android.standard()
  ) {
    safari = false;
  }
  browsers.safari = safari;
  if (safari) {
    version();
  }
};

/**
 * Safari detector
 * @since 0.4.2
 */
export default class Safari {
  /**
   * 書き換え済み `browsers` を取得します
   * @returns {?Object} 書き換え済み `browsers` を返します
   */
  static browsers() {
    init();
    return browsers;
  }

  /**
   * iOS Chrome 判定
   * @returns {boolean} true: iOS Chrome
   */
  static is() {
    init();
    return browsers.safari;
  }

  /**
   * Safari Browser version
   * @returns {number} Safari version, not Android -1
   */
  static version() {
    init();
    return browsers.version;
  }

  /**
   * Safari Browser major version
   * @returns {number} Safari major version, not Android -1
   */
  static major() {
    init();
    return browsers.major;
  }

  /**
   * Safari Browser version `major.minor.build`
   * @returns {string} Safari version NN.NN.NN.NN 型（文字）で返します
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
