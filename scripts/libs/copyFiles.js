const fse = require('fs-extra');
const chalk = require('chalk');

const copyFiles = (fromDir, toDir) => {
  console.log(chalk.green(`*** copyFiles: ${fromDir} => ${toDir}`));
  fse.copy(fromDir, toDir, (error) => {
    if (error) {
      console.log(chalk.red(`copy error: ${fromDir}`), error);
    } else {
      console.log(chalk.green(`*** copy complete: ${fromDir}`));
    }
  });
};

module.exports = copyFiles;
