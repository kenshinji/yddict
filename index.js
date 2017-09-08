#!/usr/bin/env node

const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const isChinese = require('is-chinese')
const urlencode = require('urlencode');
const spinner = new Spinner('努力查询中... %s');
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

const config = JSON.parse(readFile(configFile,"utf8"));

const word = process.argv.slice(2)[0];
const isCn = isChinese(word);
const URL = isCn ? `http://dict.youdao.com/w/eng/${urlencode(word)}`:`http://dict.youdao.com/w/${word}`
//const URL = 'http://dict.youdao.com/w/eng/%E5%A5%BD'
const options = {
  'url':URL
};

if(config){
  if(config.proxy){
    options.proxy = config.proxy;
  }
  if(config.color){
    color = config.color;
  }
}

const color_output = chalk.keyword(color);
request(options,(error, response, body)=>{

  const $ = cheerio.load(body);

  //console.log(response);
  spinner.stop(true);
  if(isCn){
    $('div.trans-container > ul').find('p.wordGroup').each(function(i,elm){
      var line = $(this).text().replace(/\s+/g," ");
      console.log(color_output(line));
    });
  }else{
    console.log(color_output($('div#phrsListTab > div.trans-container > ul').text()));
  }

});
