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

var _kv = module.exports._kv =  {};
/**
 * get/set a `value` using `key`
 *
 * @param {String} key
 * @param {Object} value
 * @returns {Object}
 */
module.exports.set = function getset (key, value) {
  console.assert('string' === typeof key, 'Key should be a string');

  return value ? _kv[key] = value : _kv[key];
}
/**
 * unset a `key` returning it's `value`
 *
 * @param {String} key
 * @returns {Object}
 */
module.exports.unset = function ungetset (key) {
  var val = _kv[key];
  delete _kv[key];
  return val;
}
