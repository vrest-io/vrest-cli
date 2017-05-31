'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.noop = noop;
exports.ifNoCaseKeyExists = ifNoCaseKeyExists;
exports.pick = pick;
exports.stringify = stringify;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = exports.isObject = function isObject(ob) {
  return (typeof ob === 'undefined' ? 'undefined' : (0, _typeof3.default)(ob)) === 'object' && ob !== null && !Array.isArray(ob);
};

function noop() {}

function ifNoCaseKeyExists(ob, key) {
  var keys = (0, _keys2.default)(ob);
  var n = keys.length;
  while (n) {
    n -= 1;
    if (keys[n].toLowerCase() === key) return true;
  }
  return false;
}

function pick(o) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(props.map(function (prop) {
    return (0, _defineProperty3.default)({}, prop, o[prop]);
  }))));
}

function stringify(input) {
  if (typeof input === 'string') return input;
  if ((typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object') {
    try {
      return (0, _stringify2.default)(input);
    } catch (err) {
      return String(input);
    }
  }
  return String(input);
}