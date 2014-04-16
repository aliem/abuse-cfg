/**
 * dependencies
 */
var path = require('path');
var fs = require('fs');

// store config hashes here
var files = {};

/**
 * load a file inside `cfg`
 * if the first parameter is omitted it will load './config.json'
 *
 * NOTE: File operations a synchronous
 *
 * @param {String} name
 * @param {String} file
 * @api public
 */
module.exports.load = function load (name, file) {
  if (/(load|save)/.test(name))
    return 'be more serious please ...';

  if (!! files[name]) {
    module.exports[name] = undefined
  }

  files[name] = path.resolve(file);

  module.exports[name] = JSON.parse(fs.readFileSync(file));
}

/**
 * save the current Object as JSON
 * to filename
 *
 * NOTE: File operations a synchronous
 *
 * @param {String} name
 * @api public
 */
module.exports.save = function save (name) {
  if (!! files[name])
    fs.writeFileSync(files[name], JSON.stringify(module.exports[name]));
}
