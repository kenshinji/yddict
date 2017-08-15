const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
//maybe we can add chalk for colorful display.

//word should be read from outside
const word = 'very';
const URL = `http://dict.youdao.com/w/eng/${word}`


request({
  'url':URL,
  'proxy':'http://web-proxy.jp.hpicorp.net:8080'
},(error, response, body)=>{
  const $ = cheerio.load(body);
  console.log(chalk.green($('div#phrsListTab > div.trans-container > ul').text()));
});
