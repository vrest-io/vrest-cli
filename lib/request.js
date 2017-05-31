'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestError = function (_Error) {
  (0, _inherits3.default)(RequestError, _Error);

  function RequestError(message) {
    (0, _classCallCheck3.default)(this, RequestError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RequestError.__proto__ || (0, _getPrototypeOf2.default)(RequestError)).call(this, message));

    _this.name = RequestError.name;
    return _this;
  }

  return RequestError;
}(Error);

function request(options) {
  var url = void 0;
  var method = void 0;
  var payload = void 0;
  var headers = void 0;
  var parser = void 0;
  return new _promise2.default(function (resolve, reject) {
    function cb(error, data) {
      if (error) reject(typeof error === 'string' ? new RequestError(error) : error);else resolve(data);
    }
    if (typeof options === 'string') {
      var _ref = [options, 'GET', JSON.parse];
      url = _ref[0];
      method = _ref[1];
      parser = _ref[2];
    } else if ((0, _util.isObject)(options)) {
      url = options.url;
      method = options.method;
      payload = options.payload;
      headers = options.headers;

      parser = typeof options.parser === 'function' ? options.parser : JSON.parse;
    } else {
      return cb('INVALID_OPTIONS');
    }
    if (typeof url !== 'string' || !url.length) return cb('URL_NOT_FOUND');
    if (typeof method !== 'string' || !method.length) return cb('METHOD_NOT_FOUND');
    if ((typeof headers === 'undefined' ? 'undefined' : (0, _typeof3.default)(headers)) !== 'object' || headers === null) headers = {};
    var obj = _url2.default.parse(url);
    obj.method = method;
    if (!(0, _util.ifNoCaseKeyExists)(headers, 'content-type')) headers['content-type'] = 'application/json';
    obj.headers = headers;
    var req = (obj.protocol === 'https:' ? _https2.default : _http2.default).request(obj, function (res) {
      var resc = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        resc += chunk;
      });
      function respond() {
        var toSend = (0, _util.pick)(res, 'statusCode', 'headers');
        toSend.content = resc;
        if (typeof parser === 'function') {
          try {
            toSend.parsed = parser(resc);
          } catch (er) {
            toSend.parseError = er;
          }
        }
        if (Math.floor(toSend.statusCode / 100) === 2) {
          cb(null, toSend);
        } else {
          cb(toSend);
        }
      }
      res.on('error', respond);
      res.on('end', respond);
    });
    req.once('error', reject);
    if (payload !== undefined) {
      payload = (0, _util.stringify)(payload);
      req.end(payload);
    } else if (options.payloadStream instanceof _fs2.default.ReadStream) {
      var mo = (0, _util.isObject)(options.multipartOptions) ? options.multipartOptions : {};
      if (!mo.boundaryKey) {
        mo.boundaryKey = Math.random().toString(16).substr(2, 11);
      }
      req.setHeader('content-type', 'multipart/form-data; boundary="----' + mo.boundaryKey + '"');
      if (mo.contentLength) {
        req.setHeader('Content-Length', mo.contentLength);
      }
      if ((0, _util.isObject)(mo.formData)) {
        (0, _entries2.default)(mo.formData).forEach(function (_ref2) {
          var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
              formKey = _ref3[0],
              formValue = _ref3[1];

          req.write('------' + mo.boundaryKey + '\r\nContent-Disposition: form-data; name="' + formKey + '"\r\n\r\n' + formValue + '\r\n');
        });
      }
      req.write('------' + mo.boundaryKey + '\r\nContent-Type: ' + (mo.mimeType || 'application/octet-stream') + '\r\nContent-Disposition: form-data; name="' + (mo.fieldName || 'file1') + '"; filename="' + (mo.fileName || 'filename') + '"\r\n\r\n');
      options.payloadStream.pipe(req, { end: false });
      options.payloadStream.once('end', req.end.bind(req, '\r\n------' + mo.boundaryKey + '--\r\n'));
      options.payloadStream.once('error', reject);
    } else {
      req.end();
    }
    return undefined;
  });
}

exports.default = request;