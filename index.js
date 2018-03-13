#!/usr/bin/env node

const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const isChinese = require('is-chinese')
const urlencode = require('urlencode')
const config = require('./lib/config')


const spinner = new Spinner('努力查询中... %s')

spinner.setSpinnerString('|/-\\')
spinner.start()

const input = process.argv.slice(2)
const word = input.join(' ')

const options = {
	'url': config.getURL(word) + urlencode(word),
	'proxy': config.proxy || null
}

// if (!config.proxy) {
// 	options.proxy = config.proxy
// }

const ColorOutput = chalk.keyword(config.color)
request(options, (error, response, body) => {
	if (error) {
		console.error(error)
	}

	// parse response
	const $ = cheerio.load(body, {
		ignoreWhitespace: true,
		xmlMode: true
	})
	let result = ''

	spinner.stop(true)
	if (isChinese(word)) {
		$('div.trans-container > ul').find('p.wordGroup').each(function (i, elm) {
			result = $(this).text().replace(/\s+/g, ' ')
		})
	} else {
		result = $('div#phrsListTab > div.trans-container > ul').text()
	}
	// phrase
	if (result === '') {
		result = $('div#webPhrase > p.wordGroup').text()
	}
	// sentence
	if (result === '') {
		result = $('div#fanyiToggle > div.trans-container > p:nth-child(2)').text()
	}
	console.log(ColorOutput(result))
})
