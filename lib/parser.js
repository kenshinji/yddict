const cheerio = require('cheerio')
const chalk = require('chalk')
const isChinese = require('is-chinese')

/**
 * 解析单词查询结果
 * @param {string} body - HTML响应体
 * @param {string} word - 查询的单词
 * @returns {object} 解析后的结果对象
 */
function parser (body, word) {
	const $ = cheerio.load(body)
	const result = {}

	// 解析音标
	const pronounces = $('.pronounce')
	if (pronounces.length) {
		result.pronounces = []
		pronounces.each((i, el) => {
			const type = $(el).find('.phonetic').text().replace(/\[|\]/g, '')
			const voice = $(el).find('.speaker').attr('data-rel')
			if (type && voice) {
				result.pronounces.push({ type, voice })
			}
		})
	}

	// 解析翻译内容
	if (isChinese(word)) {
		// 中文查英文
		const trans = $('.trans-container > ul').children('li')
		if (trans.length) {
			result.translations = []
			trans.each((i, el) => {
				result.translations.push($(el).text())
			})
		}
	} else {
		// 英文查中文
		const trans = $('#phrsListTab .trans-container > ul').children('li')
		if (trans.length) {
			result.translations = []
			trans.each((i, el) => {
				result.translations.push($(el).text().replace(/\s+/g, ' '))
			})
		}
	}

	// 解析网络释义
	const webTrans = $('.web-translation .web-translation-item')
	if (webTrans.length) {
		result.webTranslations = []
		webTrans.each((i, el) => {
			const key = $(el).find('.web-translation-key').text()
			const values = $(el).find('.web-translation-value').text().split(';')
			result.webTranslations.push({ key, values })
		})
	}

	return result
}

/**
 * 格式化输出结果
 * @param {object} result - 解析后的结果对象
 * @returns {string} 格式化后的输出字符串
 */
function format (result) {
	let output = ''

	if (result.pronounces && result.pronounces.length) {
		output += chalk.gray('\n发音：')
		result.pronounces.forEach(item => {
			output += chalk.yellow(`\n  ${item.type}`)
		})
		output += '\n'
	}

	if (result.translations && result.translations.length) {
		output += chalk.gray('\n翻译：')
		result.translations.forEach(trans => {
			output += chalk.green(`\n  ${trans}`)
		})
		output += '\n'
	}

	if (result.webTranslations && result.webTranslations.length) {
		output += chalk.gray('\n网络释义：')
		result.webTranslations.forEach(item => {
			output += chalk.blue(`\n  ${item.key}`)
			output += chalk.green(`\n    ${item.values.join('; ')}`)
		})
		output += '\n'
	}

	return output
}

module.exports = {
	parser,
	format
}
