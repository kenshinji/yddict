const request = require('request');
const Spinner = require('cli-spinner').Spinner;
const fs = require('fs');
const chalk = require('chalk');


const spinner = new Spinner('努力查询中... %s');
spinner.setSpinnerString('|/-\\');

let color = 'white';
let options = {};

const home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const configFile = home + "/config.json";

const readFile = (filename, encoding) => {
  try {
    return fs.readFileSync(filename).toString(encoding);
  } catch (e) {
    return null;
  }
};
const config = JSON.parse(readFile(configFile, "utf8"));
if (config) {
  if (config.proxy) {
    options.proxy = config.proxy;
  }
  if (config.color) {
    color = config.color;
  }
}
const console_primary = (text) => console.log(chalk.keyword(color)(text));
function getOption () {
  return Object.assign({}, options)
}
module.exports = {
  console_primary,
  getOption,
  spinner
};
