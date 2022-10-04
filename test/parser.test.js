const expect = require('chai').expect
const Parser = require('../lib/parser')
const fs = require('fs')
const path = require('path')
const expectedOutput = `英 [həˈləʊ] 美 [helˈō] \n\nint. 喂；哈罗\nn. 表示问候， 惊奇或唤起注意时的用语\nn. (Hello)人名；(法)埃洛\n\nHello, who\'s speaking, please?\n喂， 请问你是谁呀?\nThe American walked to a telephone booth,"Hello. Is that the bank?\n那个美国人走到公用电话间旁打电话:"喂,银行吗?\nShe never passes without stopping to say hello.\n她从这儿经过时没有一次不停下来问候一番。\n`
const expectedOutput2 = `\n\n hello ; hi ; how do you do \n`
describe('Unit tests for parser', () => {
	it('Test for parsing html page content when word is not Chinese', (done) => {
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/body.html'))
		expect(Parser.parse(false, body)).to.equal(expectedOutput)
		done()
	})

	it('Test for parsing html page content when word is Chinese', (done) => {
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/cn-body.html'))
		expect(Parser.parse(true, body)).to.equal(expectedOutput2)
		done()
	})
})
