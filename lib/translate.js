/**
 * 翻译模块
 */
const urlencode = require('urlencode');
const util = require('./util')
const isChinese = require('is-chinese');
const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise')

const translate = {
  translateWord (word, hasSpinner = true) {
    hasSpinner && util.spinner.start()
    const options = util.getOption()
    const isCn = isChinese(word);
    const URL = isCn ? `http://dict.youdao.com/w/eng/${urlencode(word)}` : `http://dict.youdao.com/w/${urlencode(word)}`
    options.url = URL
    return rp(options)
      .then((body, response) => {
        util.spinner.stop(true)
        const $ = cheerio.load(body, {
          ignoreWhitespace: true,
          xmlMode: true
        });
        let result = '';
      
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
        util.console_primary(word + ':\t' + result)
      })
      .catch(e => {
        util.spinner.stop(true)
        console.log(' Query failed \n 查询失败,请重试')
      })
  }
};

module.exports = translate