/**
 * 搜索模块
 */
const util = require('./util');
const rp = require('request-promise');
const qs = require('qs');
const decodeUriComponent = require('decode-uri-component');
const cheerio = require('cheerio');

const form = {
  setSearchMoreParams() {},
  updateCall(res) {
    let str = decodeUriComponent(res).replace(/%2F/g, '')
    const $ = cheerio.load(str)
    $('td').each((index, element) => {
      const text = $(element).text()
      text.trim().length !== 0 && util.console_primary(text)
    })
  }
}

let getQueryString = () => ({query: '',keyfrom : 'dict2.top.suggest',o : 'form',rn : 10,h : 18,le : 'eng'})
const search = {
  searchEng (word) {
    util.spinner.start();
    let opition = util.getOption();
    let queryString = getQueryString()
    queryString.query = word
    opition.url = `https://dsuggest.ydstatic.com/suggest.s?` + qs.stringify(queryString)
    rp.get(opition)
      .then(res => {
        util.spinner.stop(true)
        eval(res)
      })
      .catch(e => {
        console.log(e)
        util.spinner.stop(true)
      })
  }
}
module.exports = search