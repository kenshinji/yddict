#!/usr/bin/env node

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const isChinese = require('is-chinese')
const urlencode = require('urlencode');

const pkg = require('./package.json');
const Configstore = require('configstore');
var conf = new Configstore(pkg.name, { color : 'white'});

const spinner = new Spinner('努力查询中... %s');

spinner.setSpinnerString('|/-\\');
spinner.start();

const input = process.argv.slice(2)
const word = input.join(' ')


const options = {
  'url':isChinese(word) ? `http://dict.youdao.com/w/eng/${urlencode(word)}`:`http://dict.youdao.com/w/${urlencode(word)}`
};

if(conf.get('proxy')){
    options.proxy = conf.get('proxy')
}

let color = conf.get('color');


const color_output = chalk.keyword(color);
request(options,(error, response, body)=>{

  //parse response
  const $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });
  let result = '';

  spinner.stop(true);
  if(isChinese(word)){
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
  console.log(color_output(result));

});
