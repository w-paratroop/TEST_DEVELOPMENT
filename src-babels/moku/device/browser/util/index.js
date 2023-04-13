import devices from '../../devices';

const regex = {
  chrome: /chrome\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/i,
  crios: /crios\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/i,
  edgea: /edga\/(\d+)\.(\d+)\.(\d+)\.?(\d+)?/i,
  edge: /edge\/(\d+)\.(\d+)\.?(\d+)?/i,
  edgios: /edgios\/(\d+)\.(\d+)\.?(\d+)?/i,
  firefox: /firefox\/(\d+)\.?(\d+)?/i,
  fxios: /fxios\/(\d+)\.?(\d+)?/i,
  safari: /version\/(\d+)\.(\d+)\.?(\d+)?/i,
};

export const getNumbers = (app, regex) => app.match(regex);

export const isArray = (list) => Array.isArray(list);

export const getNumbersWithApp = (browser) => {
  const { app } = devices;
  const numbers = getNumbers(app, regex[browser.toLowerCase()]);
  return isArray(numbers) ? numbers : null;
};

export const buildNum = (list) => list.join('.');

export const getVersions = (list) =>
  list.map((num) => parseInt(num, 10)).filter((int) => !Number.isNaN(int));

export const setBrowsersBuild = (browsers, list) => {
  browsers.build = buildNum(list);
  return browsers;
};

export const getMajor = (list) => parseInt(list[0], 10);

export const getMinor = (list) => (list[1] ? list[1] : 0);

export const getBuild = (list) => (list[2] ? list[2] : '');

export const getOption = (list) => (list[3] ? list[3] : '');

export const parseMajor = (list) => ({
  major: getMajor(list),
  minor: getMinor(list),
  build: getBuild(list),
  option: getOption(list),
});

export const setBrowsersMajor = (browsers, list) => {
  const { major, minor, build, option } = parseMajor(list);
  browsers.major = major;
  browsers.version = parseFloat(`${major}.${minor}${build}${option}`);
  browsers.numbers = [...list];
  return browsers;
};
