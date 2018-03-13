const expect =require('chai').expect
const config = require('../lib/config')

describe('Unit tests for config', () => {
	it('Tests for reading configurations', (done) => {
	  expect(config.proxy === undefined).to.be.true
		expect(config.color).to.equal('white')
		done()
	})
})
