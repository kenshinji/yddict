const cheerio = require('cheerio')

let parser = {}
parser.parse = function (isChinese, body, noSampleSentence) {
	const $ = cheerio.load(body)
	let result = ''
	let sentenceSample = ''
	if (isChinese) {
		$('div.trans-container > ul').find('p.wordGroup').each(function (i, elm) {
			result += $(this).text().replace(/\s+/g, ' ')
		})
	} else {
		$('div#phrsListTab > div.trans-container > ul').find('li').each(function (i, elm) {
			result += $(this).text().replace(/\s+/g, ' ') + '\n'
		})
		if (!noSampleSentence) {
			$('#bilingual ul li').find('p').each(function (i, elm) {
				if ($(this).attr('class') !== 'example-via') {
					sentenceSample += $(this).text().trim() + '\n'
				}
			})
		}
	}
	// phrase or sentence
	if (result === '') {
		result = $('div#webPhrase > p.wordGroup').text() !== '' ? $('div#webPhrase > p.wordGroup').text() : $('div#fanyiToggle > div.trans-container > p:nth-child(2)').text()
	}
	// phonetic
	var phonetic = $('div#phrsListTab > h2.wordbook-js > div.baav > span').text().replace(/\s+/g, ' ')
	result = phonetic + '\n\n' + result + '\n' + sentenceSample
	return result
}
parser.getOptions = function (argv) {
	try {
		var includeSample = argv[2] === '-v'
		var index = 0
		if (includeSample) {
			index = 3
		} else {
			index = 2
		}
		var word = argv.slice(index).join(' ')
		return { includeSample: includeSample, word: word }
	} catch (err) {
		return {err: err.message}
	}
}

module.exports = parser
