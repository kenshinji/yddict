#!/usr/bin/env node

const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const isChinese = require('is-chinese')
const urlencode = require('urlencode')
const config = require('./lib/config')
const Parser = require('./lib/parser')


const spinner = new Spinner('努力查询中... %s')

spinner.setSpinnerString('|/-\\')
spinner.start()

const word = process.argv.slice(2).join(' ')
const is_CN = isChinese(word)

const options = {
	'url': config.getURL(word) + urlencode(word),
	'proxy': config.proxy || null
}

const ColorOutput = chalk.keyword(config.color)
request(options, (error, response, body) => {
	if (error) {
		console.error(error)
	}

	spinner.stop(true)
	console.log(ColorOutput(Parser.parse(is_CN, body)))
})
