const pkg = require('../package.json')
const Configstore = require('configstore')
const isChinese = require('is-chinese')

// 默认配置
const DEFAULT_CONFIG = {
	color: 'white',
	spinner: true,
	proxy: undefined
}

// 初始化配置存储
const conf = new Configstore(pkg.name, DEFAULT_CONFIG)

// 有道词典 API 基础 URL
const YOUDAO_BASE_URL = 'https://dict.youdao.com/w'

const config = {
	// 从存储中获取配置，如果没有则使用默认值
	proxy: conf.get('proxy'),
	spinner: conf.get('spinner'),
	color: conf.get('color'),

	/**
	 * 根据输入词判断返回适当的查询 URL
	 * @param {string} word - 要查询的词
	 * @returns {string} 完整的查询 URL
	 */
	getURL (word) {
		const path = isChinese(word) ? '/eng/' : '/'
		return `${YOUDAO_BASE_URL}${path}`
	}
}

module.exports = config
