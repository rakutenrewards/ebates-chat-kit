const chalk = require('chalk');
const fs = require('fs');
const { exec } = require('child-process-promise');
const pkg = require('../package.json');

function updateVersionNumber() {
  const buildNumber = process.env.TRAVIS_BUILD_NUMBER || '999';

  const v = pkg.version.split('.');
  const i = v.length;
  v[i - 1] = buildNumber;
  pkg.version = v.join('.');

  const packageJSON = JSON.stringify(pkg, null, 2);
  fs.writeFileSync('package.json', `${packageJSON}\n`, 'utf-8');
  return pkg.version;
}

async function run() {
  try {
    console.log("Updating the package's version number...");
    var newVersion = updateVersionNumber();

    console.log(chalk`{green DONE!}`);
  } catch (error) {
    const message = error.message.trim().replace(/\n +/g, '\n');
    const stack = error.stack.replace(error.message, '');
    console.log(chalk`{bgRed.white  ERROR } {red ${message}}\n\n{gray ${stack}}`);

    process.exit(1);
  }
}

run();
