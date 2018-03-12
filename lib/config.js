const pkg = require('../package.json')
const Configstore = require('configstore')
const conf = new Configstore(pkg.name, { color: 'white' })
let config = {
	proxy: conf.get('proxy') ? conf.get('proxy') : undefined,
	color: conf.get('color')
}

module.exports = config
