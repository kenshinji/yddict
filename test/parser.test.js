const expect = require('chai').expect
const { parser, format } = require('../lib/parser')
const fs = require('fs')
const path = require('path')

describe('Unit tests for parser', () => {
	it('Should parse English word correctly', (done) => {
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/body.html'))
		const result = parser(body, 'hello')

		expect(result).to.be.an('object')
		if (result.pronounces && result.pronounces.length) {
			expect(result.pronounces).to.be.an('array')
			const output = format(result)
			expect(output).to.include('发音')
		}

		expect(result).to.have.property('translations')
		expect(result.translations).to.be.an('array')
		const output = format(result)
		expect(output).to.be.a('string')
		expect(output).to.include('翻译')
		done()
	})

	it('Should parse Chinese word correctly', (done) => {
		const body = fs.readFileSync(path.join(__dirname, '../test/fixtures/cn-body.html'))
		const result = parser(body, '你好')

		expect(result).to.have.property('translations')
		expect(result.translations).to.be.an('array')

		const output = format(result)
		expect(output).to.be.a('string')
		expect(output).to.include('翻译')
		done()
	})
})
