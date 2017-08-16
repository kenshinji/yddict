#!/usr/bin/env node
const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');

//const config = JSON.parse(fs.readFileSync('./config.json','utf8'));


const readFile = (filename, encoding) => {

    try {
        return fs.readFileSync(filename).toString(encoding);
    }
    catch (e) {
        return null;
    }
};

const config = JSON.parse(readFile("./config.json","utf8"));

const word = process.argv.slice(2)[0];
const URL = `http://dict.youdao.com/w/eng/${word}`
const options = {
  'url':URL
};

if(config && config.proxy){
  options.proxy = config.proxy;
}


request(options,(error, response, body)=>{
  const $ = cheerio.load(body);
  console.log(chalk.blue($('div#phrsListTab > div.trans-container > ul').text()));
});
