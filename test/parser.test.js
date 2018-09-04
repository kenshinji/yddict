const expect = require('chai').expect
const Parser = require('../lib/parser')
const fs = require('fs')
const path = require('path')
describe('Unit tests for parser', () => {
	it('Test for parsing html page content', (done) => {
		const expectedOutput = `英 [həˈləʊ] 美 [helˈō] \n\nint. 喂；哈罗\nn. 表示问候， 惊奇或唤起注意时的用语\nn. (Hello)人名；(法)埃洛\n\nHello, who\'s speaking, please?\n喂， 请问你是谁呀?\nThe American walked to a telephone booth,"Hello. Is that the bank?\n那个美国人走到公用电话间旁打电话:"喂,银行吗?\nShe never passes without stopping to say hello.\n她从这儿经过时没有一次不停下来问候一番。\n`
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/body.html'))
		expect(Parser.parse(false, body)).to.equal(expectedOutput)
		done()
	})
	it('no sentence demo', (done) => {
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/body.html'))
		var expectedOutput = `英 [həˈləʊ] 美 [helˈō] \n\nint. 喂；哈罗\nn. 表示问候， 惊奇或唤起注意时的用语\nn. (Hello)人名；(法)埃洛\n\n`
		var result = Parser.parse(false, body, true)
		expect(result).to.equal(expectedOutput)
		done()
	})
	it('argv parse', (done) => {
		const argv = ['cmd', 'jspath', '-v', 'hello']
		var expectedOutput = {includeSample: true, word: 'hello'}
		var result = Parser.getOptions(argv)
		expect(result).to.deep.equal(expectedOutput)
		done()
	})
	it('argv parse', (done) => {
		const argv = ['cmd', 'jspath', '-v']
		var expectedOutput = {includeSample: true, word: ''}
		var result = Parser.getOptions(argv)
		expect(result).to.deep.equal(expectedOutput)
		done()
	})
	it('argv parse', (done) => {
		const argv = ['cmd', 'jspath', 'hello']
		var expectedOutput = {includeSample: false, word: 'hello'}
		var result = Parser.getOptions(argv)
		expect(result).to.deep.equal(expectedOutput)
		done()
	})
	it('argv parse', (done) => {
		const argv = ['cmd', 'jspath', 'hello', `-v`]
		var expectedOutput = {includeSample: false, word: 'hello -v'}
		var result = Parser.getOptions(argv)
		expect(result).to.deep.equal(expectedOutput)
		done()
	})
	it('argv parse err', (done) => {
		const argv = ['cmd', 'jspath']
		var result = Parser.getOptions(argv)
		expect(result.err).to.not.equal(undefined)
		done()
	})
})
