const expect = require('chai').expect
const Parser = require('../lib/parser')
const fs = require('fs');
const path = require('path')
const expected_output = ' int. 喂；哈罗 n. 表示问候， 惊奇或唤起注意时的用语 n. (Hello)人名；(法)埃洛 '


describe('Unit tests for parser', () => {
	it('Test for parsing html page content', (done) => {
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/body.html'))
		expect(Parser.parse(false, body)).to.equal(expected_output)
		done() 
	})
})
