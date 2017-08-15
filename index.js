const request = require('request');
const cheerio = require('cheerio');


const word = 'very';
const URL = `http://dict.youdao.com/w/eng/${word}`
const options =

request({
  'url':URL,
  'proxy':'http://web-proxy.jp.hpicorp.net:8080'
},(error, response, body)=>{
  //console.log(cheerio.load(body)('div.trans-container'));
  const $ = cheerio.load(body);
  console.log($('div#phrsListTab > div.trans-container > ul').text());
});
