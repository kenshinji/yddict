#!/usr/bin/env node

const request = require('request')
const chalk = require('chalk')
const ora = require('ora')
const isChinese = require('is-chinese')
const urlencode = require('urlencode')
const noCase = require('no-case')
const config = require('./lib/config')
const Parser = require('./lib/parser')

let word = process.argv.slice(2).join(' ')
if (!word) {
	console.log('Usage: yd <WORD_TO_QUERY>')
	process.exit()
}

let spinner
if (config.spinner) {
	spinner = ora('努力查询中... ').start()
}

const isCN = isChinese(word)

word = isCN ? word : noCase(word)

const options = {
	'url': config.getURL(word) + urlencode(word),
	'proxy': config.proxy || null
}

const ColorOutput = chalk.keyword(config.color)
request(options, (error, response, body) => {
	if (error) {
		console.error(error)
	}

	if (config.spinner) {
		spinner.stop()
	}
	console.log(ColorOutput(Parser.parse(isCN, body)))
})
