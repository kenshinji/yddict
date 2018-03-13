const expect =require('chai').expect
const config = require('../lib/config')

describe('Unit tests for config', () => {
	it('Tests for reading configurations', (done) => {
	  expect(config.proxy === undefined).to.be.true
		expect(config.color).to.equal('white')
		expect(config.getURL('hello')).to.equal('http://dict.youdao.com/w/')
		expect(config.getURL('你好')).to.equal('http://dict.youdao.com/w/eng/')
		done()
	})
})
