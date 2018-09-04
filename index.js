#!/usr/bin/env node
const Parser = require('./lib/parser')
var options_ = Parser.getOptions(process.argv)
let word = options_.word
let includeSample = options_.includeSample
if (!word) {
	console.log('Usage: yd [-v]<WORD_TO_QUERY>')
	process.exit()
}
Parser.query(word, includeSample)
