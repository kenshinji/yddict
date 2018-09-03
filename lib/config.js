const pkg = require('../package.json')
const Configstore = require('configstore')
const isChinese = require('is-chinese')
const conf = new Configstore(pkg.name, { color: 'white', spinner: true, eg: true })
let config = {
	proxy: conf.get('proxy') ? conf.get('proxy') : undefined,
	spinner: conf.get('spinner'),
	color: conf.get('color'),
	eg: conf.get('eg'),
	getURL: function (word) {
		return isChinese(word) ? 'http://dict.youdao.com/w/eng/' : 'http://dict.youdao.com/w/'
	},
	setColor: function (mycolor) {
		conf.set('color', mycolor)
	},
	setEg: function (isShow) {
		conf.set('eg', isShow)
	}
}

module.exports = config
