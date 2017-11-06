#!/usr/bin/env node
const translate = require('./lib/translate')
const controll = require('./lib/search');
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
  const errHandle = (e) => {
    console.log('查询出现错误,请重试')};
    const input = argv._; // 用户输入的搜索字符
    const word = input.join(' ');
    
    // 判断是否输入内容
    if (word.trim().length === 0) {
      console.log('please input the word to translate\n请输入要翻译的内容')
      return
    }
    
translate.translateWord(word)
  .then(res => {
  })
  .catch(errHandle)
