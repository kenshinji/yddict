const pkg = require('../package.json')
const Configstore = require('configstore')
const isChinese = require('is-chinese')
const conf = new Configstore(pkg.name, { color: 'white' })
let config = {
	proxy: conf.get('proxy') ? conf.get('proxy') : undefined,
	color: conf.get('color'),
	getURL: function(word){
		return isChinese(word) ? 'http://dict.youdao.com/w/eng/' : 'http://dict.youdao.com/w/' 
	}
}

module.exports = config
