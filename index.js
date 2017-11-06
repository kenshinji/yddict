#!/usr/bin/env node

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const isChinese = require('is-chinese')
const urlencode = require('urlencode');
const search = require('./lib/search')
const argv = require('yargs')
  .usage('Usage: <word> [options]')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv
const spinner = new Spinner('努力查询中... %s');
const home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const configFile = home + "/config.json";
let color = 'white';


const input = argv._ // 用户输入的搜索字符
const word = input.join(' ')

// 判断是否输入内容
if (word.trim().length === 0) {
  console.log('please input the word to translate\n请输入要翻译的内容')
  return
}

spinner.setSpinnerString('|/-\\');
spinner.start();

const readFile = (filename, encoding) => {

  try {
    return fs.readFileSync(filename).toString(encoding);
  } catch (e) {
    return null;
  }
};

const config = JSON.parse(readFile(configFile, "utf8"));

const isCn = isChinese(word);
const URL = isCn ? `http://dict.youdao.com/w/eng/${urlencode(word)}` : `http://dict.youdao.com/w/${urlencode(word)}`

const options = {
  'url': URL
};

if (config) {
  if (config.proxy) {
    options.proxy = config.proxy;
  }
  if (config.color) {
    color = config.color;
  }
}

const color_output = chalk.keyword(color);
request(options, (error, response, body) => {
  const $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });
  let result = '';

  spinner.stop(true);
  if (isCn) {
    $('div.trans-container > ul').find('p.wordGroup').each(function (i, elm) {
      result = $(this).text().replace(/\s+/g, " ");
    });
  } else {
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
  console.log(color_output(result));

});