var config = require('./')
config.load('package', './package.json')

console.assert(config.package.version === "0.0.1", "Someone changed version")

console.log('done.');
