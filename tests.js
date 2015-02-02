var test = require('tape')
var path = require('path')

var config = require('./')
config.load('package', path.resolve(path.join(__dirname, 'package.json')))

test("load of a json file", function (t) {
  t.plan(1)
  t.equal(config.package.version, "0.0.1")
})

test("submodules should have the save configuration", function (t) {
  t.plan(4)

  t.deepEqual(config.package, suba(), "Configuration inside new namespaces should have the same properties")
  t.deepEqual(config.package, subb(), "Configuration inside new namespaces should have the same properties at any time")

  config.package.version = "1.3.37"
  t.equal(suba().version, "1.3.37", "Changing a property should reflect")
  t.equal(subb().version, "1.3.37", "Changing a property should reflect also in old includes")
})

test("dumb key value storage", function (t) {
  t.plan(4)

  config.set("foo", "bar")
  t.equal(config._kv.foo, "bar", "should store a value")
  t.throws(config.set)

  t.equal(config.unset("foo"), "bar", "should return the value on unset")
  t.equal(config.unset("foo"), undefined, "should return undefined when deleting undefined keys")
})

function suba () {
  var config = require('./')
  return config.package
}

var subb = (function () {
  var config = require('./')

  return function () {
    return config.package
  }
})()
