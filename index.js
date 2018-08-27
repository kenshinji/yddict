#!/usr/bin/env node

const request = require('request')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
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

const spinner = new Spinner('努力查询中... %s')

if (config.spinner) {
	spinner.setSpinnerString('|/-\\')
	spinner.start()
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
		spinner.stop(true)
	}
	console.log(ColorOutput(Parser.parse(isCN, body)))
})
