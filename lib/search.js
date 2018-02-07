/**
 * 搜索模块
 */
const util = require('./util');
const rp = require('request-promise');
const qs = require('qs');
const decodeUriComponent = require('decode-uri-component');
const cheerio = require('cheerio');
const translate = require('./translate');
const isChinese = require('is-chinese');
// 为了配合返回数据的格式 设置好回调函数
const form = {
  setSearchMoreParams() {},
  updateCall(res) {
    let str = decodeUriComponent(res).replace(/%2F/g, '');
    const $ = cheerio.load(str);
    let promiseArrays = [];
    // 获取到每个关联的单词 推送到Promise中
    util.spinner.start();
    $('td').each((index, element) => {
      const text = $(element).text()
      if (text.trim().length !== 0) {
        promiseArrays.push(translate.translateWord(text, false))
      }
    })
    return Promise.all(promiseArrays);
  }
}

let getQueryString = () => ({query: '',keyfrom : 'dict2.top.suggest',o : 'form',rn : 10,h : 18,le : 'eng'})
const search = {
  searchEng (word) {
    if (isChinese(word)) {
      console.log(' Supports English \n 搜索仅支持英文')
      return
    }
    
    let opition = util.getOption();
    let queryString = getQueryString();
    queryString.query = word
    opition.url = `https://dsuggest.ydstatic.com/suggest.s?` + qs.stringify(queryString);
    rp.get(opition)
      .then(res => {
        // console.log(res.slice(res.indexOf('') + 'form.updateCall("'.length, -2))
        // console.log(res)
        let str = res.match(/form.updateCall\("(.|\n)+[");]+/)[0]
        str = str.slice('form.updateCall\("'.length, -3)
        // return eval(res);
        form.updateCall(str)
      })
      .catch(e => {
        console.log(' Query failed \n 查询失败,请重试');
      })
      .finally(()=> {
        util.spinner.stop(true);
      })
  }
}
module.exports = search