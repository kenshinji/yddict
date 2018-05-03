const cheerio = require('cheerio')

let parser = {}
parser.parse = function(isChinese, body){
	const $ = cheerio.load(body, {
		ignoreWhitespace: true,
		xmlMode: true
	})
	let result = ''
	if (isChinese) {
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
	// phonetic
	result = $('div#phrsListTab > h2.wordbook-js > div.baav > span').text().replace(/\s+/g," ") + result;
	return result;
}
module.exports = parser
