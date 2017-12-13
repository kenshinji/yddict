#!/usr/bin/env node

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const isChinese = require('is-chinese')
const urlencode = require('urlencode');
const program = require('commander');
const spinner = new Spinner('努力查询中... %s');
const pkg = require('../package.json');
const home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const configFile = home + "/config.json";
let color = 'white';

spinner.setSpinnerString('|/-\\');
spinner.start();

const readFile = (filename, encoding) => {
  try {
      return fs.readFileSync(filename).toString(encoding);
  }
  catch (e) {
      return null;
  }
};

const startRequest = (options, isCn, cb) => {
  request(options,(error, response, body)=>{
    const $ = cheerio.load(body, {
      ignoreWhitespace: true,
      xmlMode: true
    });
    let result = '';
  
    if(isCn){
      $('div.trans-container > ul').find('p.wordGroup').each(function(i,elm){
        result = $(this).text().replace(/\s+/g," ");
      });
    }else{
      result = $('div#phrsListTab > div.trans-container > ul').text();
    }
    // phrase
    if (result === '') {
      result = $('div#webPhrase > p.wordGroup').text();
    }
    // sentence
    if (result === '') {
      result = $('div#fanyiToggle > div.trans-container > p:nth-child(2)').text();
    }
    cb(result);
  });
}

let input = process.argv.slice(2);
let language = 'eng';
const options = {};
const config = JSON.parse(readFile(configFile,"utf8"));
if(config){
  if(config.proxy){
    options.proxy = config.proxy;
  }
  if(config.color){
    color = config.color;
  }
}
const color_output = chalk.keyword(color);

const languageList = ['cn', 'eng', 'fr', 'ko', 'jap'];
const cmdOptions = [
  ['-l, --language', 'Choose langage of yddict']
];

program.version(pkg.version);
cmdOptions.forEach((item) => {
  program.option(...item);
});
program.parse(process.argv);

if (program.language) {
  if (process.argv[3] && languageList.indexOf(process.argv[3]) > -1) {
    language = process.argv.slice(3, 4);
    input = process.argv.slice(4);
  } else {
    console.log(chalk.red('Can not find valid language!'));
  }
}

const word = input.join(' ');
const isCn = isChinese(word);
const URL = isCn ? `http://dict.youdao.com/w/${language}/${urlencode(word)}`:`http://dict.youdao.com/w/${urlencode(word)}`;
options.url = URL;

startRequest(options, isCn, (result) => {
  spinner.stop(true);
  console.log(color_output(result));
});
