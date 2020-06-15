const pkg = require('../package.json')
const Configstore = require('configstore')
const isChinese = require('is-chinese')
const conf = new Configstore(pkg.name, { color: 'white', spinner: true })
let config = {
	proxy: conf.get('proxy') ? conf.get('proxy') : undefined,
	spinner: conf.get('spinner'),
	color: conf.get('color'),
	getURL: function (word) {
		return isChinese(word) ? 'https://dict.youdao.com/w/eng/' : 'https://dict.youdao.com/w/'
	}
}


module.exports = config
