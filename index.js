#!/usr/bin/env node

const translate = require('./lib/translate')
const search = require('./lib/search');
const util = require('./lib/util')
const argv = require('yargs')
  .options('s', {
    alias: 'search',
    boolean: true,
    describe: 'search *only English*'
  })
  .usage('Usage: <word> [options]')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv
const input = argv._; 
const word = input.join(' '); // 用户输入的搜索字符

// 判断是否输入内容
if (word.trim().length === 0) {
  console.log('please input the word to translate\n请输入要翻译的内容')
  return
}


if(argv.search) {
  search.searchEng(word)
  return
}

translate.translateWord(word)