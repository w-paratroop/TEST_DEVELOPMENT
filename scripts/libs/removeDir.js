const fs = require('fs');
const chalk = require('chalk');

// ---
// remove directory
const removeDir = (pathToDir) => {
  console.log(chalk.magenta(`start clean ${pathToDir}`));
  if (fs.existsSync(pathToDir)) {
    const files = fs.readdirSync(pathToDir);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(`${pathToDir}/${filename}`).isDirectory()) {
          removeDir(`${pathToDir}/${filename}`);
          console.log(chalk.white(`removeDir: ${pathToDir}/${filename}`));
        } else {
          fs.unlinkSync(`${pathToDir}/${filename}`);
          console.log(chalk.white(`unlinkSync: ${pathToDir}/${filename}`));
        }
      });
      fs.rmdirSync(pathToDir);
      console.log(chalk.white(`rmdirSync: ${pathToDir}`));
    } else {
      fs.rmdirSync(pathToDir);
      console.log(chalk.white(`rmdirSync: ${pathToDir}`));
    }
  } else {
    console.log(chalk.red(`Directory path not found: ${pathToDir}`));
  }
};
// ---
module.exports = removeDir;
