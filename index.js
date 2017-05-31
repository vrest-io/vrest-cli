#! /usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return signin();

          case 3:
            data = _context.sent;

            data = extractCookie(data);
            _context.next = 7;
            return callApi(data);

          case 7:
            process.exit(0);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            (0, _logger.error)(_context.t0);
            process.exit(1);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('./lib/request');

var _request2 = _interopRequireDefault(_request);

var _util = require('./lib/util');

var _logger = require('./lib/logger');

var _extractArgs = require('./lib/extractArgs');

var _extractArgs2 = _interopRequireDefault(_extractArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signin() {
  var urlob = _extractArgs2.default.parsedurl;
  return (0, _request2.default)({
    url: urlob.protocol + '//' + urlob.host + '/user/signin',
    method: 'POST',
    payload: (0, _util.pick)(_extractArgs2.default, 'email', 'password')
  });
}

function extractCookie(data) {
  return data.headers['set-cookie'][0];
}

function saveToFile(data) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.writeFile(_extractArgs2.default.filepath, (0, _stringify2.default)(data.parsed, null, '  '), function (err) {
      if (err) reject(err);else resolve();
    });
  });
}

function callApi(cook) {
  var urlob = _extractArgs2.default.parsedurl;
  switch (_extractArgs2.default.apicall) {
    case 'import':
      return (0, _request2.default)({
        url: urlob.protocol + '//' + urlob.host + urlob.pathname.replace('/g/', '/import/' + urlob.query.projectId + '/' + _extractArgs2.default.from + '/'),
        method: 'POST',
        headers: { cookie: cook },
        payloadStream: _fs2.default.createReadStream(_extractArgs2.default.filepath),
        multipartOptions: {
          formData: {
            tsAction: _extractArgs2.default.tsaction,
            _op: _extractArgs2.default.update,
            testSuiteId: _extractArgs2.default.testsuiteid
          },
          mimeType: 'application/json'
        }
      });
    default:
      return (0, _request2.default)({
        url: _extractArgs2.default.url.replace('/g/', '/f/json/'),
        method: 'GET',
        headers: { cookie: cook }
      }).then(saveToFile);
  }
}

main();