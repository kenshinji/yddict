/**
 * 搜索模块
 */
const util = require('./util');
const rp = require('request-promise');
const qs = require('qs');
const decodeUriComponent = require('decode-uri-component');
const cheerio = require('cheerio');
const translate = require('./translate')

// 为了配合返回数据的格式 设置好回调函数
const form = {
  setSearchMoreParams() {},
  updateCall(res) {
    let str = decodeUriComponent(res).replace(/%2F/g, '')
    const $ = cheerio.load(str)
    let promiseArrays = []
    // 获取到每个关联的单词 推送到Promise中
    util.spinner.start()
    $('td').each((index, element) => {
      const text = $(element).text()
      if (text.trim().length !== 0) {
        promiseArrays.push(translate.translateWord(text, false))
      }
    })
    return Promise.all(promiseArrays)
  }
}

let getQueryString = () => ({query: '',keyfrom : 'dict2.top.suggest',o : 'form',rn : 10,h : 18,le : 'eng'})
const search = {
  searchEng (word) {
    let opition = util.getOption();
    let queryString = getQueryString()
    queryString.query = word
    opition.url = `https://dsuggest.ydstatic.com/suggest.s?` + qs.stringify(queryString)
    rp.get(opition)
      .then(res => {
        return eval(res)
      })
      .finally(()=> {
        util.spinner.stop(true)
      })
  }
}
module.exports = search