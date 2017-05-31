'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports.warn = warn;
exports.log = log;

var _extractArgs = require('./extractArgs');

var _extractArgs2 = _interopRequireDefault(_extractArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function error() {
  if (_extractArgs2.default.loglevel > -1) {
    var _console;

    (_console = console).error.apply(_console, arguments); // eslint-disable-line no-console
  }
}
function warn() {
  if (_extractArgs2.default.loglevel > 0) {
    var _console2;

    (_console2 = console).warn.apply(_console2, arguments); // eslint-disable-line no-console
  }
}
function log() {
  if (_extractArgs2.default.loglevel > 1) {
    var _console3;

    (_console3 = console).log.apply(_console3, arguments); // eslint-disable-line no-console
  }
}