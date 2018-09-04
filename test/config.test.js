const dirtyChai = require('dirty-chai')
const config = require('../lib/config')
const chai = require('chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('Unit tests for config', () => {
	xit('Tests for reading configurations', (done) => {
		expect(config.proxy === undefined).to.be.true()
		expect(config.spinner === true).to.be.true()
		expect(config.color).to.equal('white')
		expect(config.getURL('hello')).to.equal('http://dict.youdao.com/w/')
		expect(config.getURL('你好')).to.equal('http://dict.youdao.com/w/eng/')
		done()
	})
})
