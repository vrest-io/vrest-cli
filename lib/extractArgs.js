'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStringValue = function getStringValue(inp) {
  if (inp === '1' || inp === 'true') return true;
  if (inp) return inp;
  return undefined;
};

var _require = require('../package.json'),
    version = _require.version,
    name = _require.name,
    description = _require.description; // eslint-disable-line import/no-unresolved

var showError = function showError(message) {
  console.log('\n    ' + name + ' - ' + description + ' .\n'); // eslint-disable-line no-console
  console.log('    version - ' + version + '\n'); // eslint-disable-line no-console
  if (typeof message === 'string') {
    console.error(message); // eslint-disable-line no-console
  }
  process.exit(2);
};

var ALLOWED_API_CALLS = ['export', 'import'];
var ALLOWED_LOG_LEVELS = ['prod', 'test', 'dev'];
var ALLOWED_FROM = ['swagger', 'json', 'postman'];

var options = {};
var showHelp = false;

var argvs = process.argv.slice(2);
var arl = argvs.length;
for (var ind, arg, key, value, val, z = 0; z < arl; z += 1) {
  arg = argvs[z];
  ind = arg.indexOf('=');
  if (ind === -1) {
    showHelp = true;
    break;
  }
  key = arg.substr(0, ind);
  value = getStringValue(arg.substr(ind + 1));
  val = ALLOWED_LOG_LEVELS.indexOf(value);
  switch (key.toLowerCase()) {
    case '-a':
    case '--apicall':
      if (ALLOWED_API_CALLS.indexOf(value) !== -1) {
        options.apicall = value;
      } else {
        showHelp = 'Allowed values for `' + key + '` must be one of `' + String(ALLOWED_API_CALLS) + '`.';
      }
      break;
    case '-l':
    case '--loglevel':
      if (val !== -1) {
        options.loglevel = val;
      } else {
        showHelp = 'Allowed values for `' + key + '` must be one of `' + String(ALLOWED_LOG_LEVELS) + '`.';
      }
      break;
    case '-e':
    case '--email':
      if (typeof value === 'string') {
        options.email = value;
      }
      break;
    case '-p':
    case '--password':
      if (typeof value === 'string') {
        options.password = value;
      }
      break;
    case '-f':
    case '--filepath':
      if (typeof value === 'string') {
        options.filepath = value;
      }
      break;
    case '-u':
    case '--url':
      if (typeof value === 'string') {
        options.url = value;
      }
      break;
    case '-t':
    case '--testsuiteid':
      if (typeof value === 'string') {
        options.testsuiteid = value;
      }
      break;
    case '-s':
    case '--selectedtestsuite':
      options.tsaction = value;
      break;
    case '-m':
    case '--from':
      if (ALLOWED_FROM.indexOf(value) !== -1) {
        options.from = value;
      } else {
        showHelp = 'Allowed values for `' + key + '` must be one of `' + String(ALLOWED_FROM) + '`.';
      }
      break;
    case '-c':
    case '--create':
      options.update = value;
      break;
    case '-h':
    case '--help':
      showHelp = true;
      break;
    default:
      showHelp = 'Invalid argument `' + key + '` was provided. Try again with valid arguments.';
  }
}

if (!showHelp) {
  if (!Object.prototype.hasOwnProperty.call(options, 'email')) {
    showError('Login email is a required input. Pass it as --email=<youremail>');
  }
  if (!Object.prototype.hasOwnProperty.call(options, 'password')) {
    options.password = process.env.VREST_PASSWORD;
  }
  if (typeof options.password !== 'string') {
    showError('Login password is a required input. Pass it as --password=<your_vrest_password>');
  }
  if (!Object.prototype.hasOwnProperty.call(options, 'url')) {
    showError('URL is a required input. Pass it as --url="<your_vrest_fetch_url>"');
  }
  if (options.url.indexOf('http') !== 0) {
    showError('URL is invalid. It must start with `https`');
  }
  options.tsaction = options.tsaction ? 'onl' : 'def';
  if (!Object.prototype.hasOwnProperty.call(options, 'apicall')) {
    options.apicall = 'export';
  }
  if (options.apicall === 'import') {
    if (!Object.prototype.hasOwnProperty.call(options, 'testsuiteid')) {
      showError('Import call must have test suite id. Pass it as parameter --testsuiteid=<testsuiteid>');
    }
    options.update = options.update ? 0 : 2;
    if (!Object.prototype.hasOwnProperty.call(options, 'from')) {
      options.from = 'json';
    }
  }
  if (!Object.prototype.hasOwnProperty.call(options, 'filepath')) {
    options.filepath = process.cwd() + '/vrest_file.json';
  }
}

if (showHelp) {
  showError(showHelp);
}

if (!Object.prototype.hasOwnProperty.call(options, 'loglevel')) {
  var loglevel = ALLOWED_LOG_LEVELS.indexOf(process.env.NODE_ENV);
  if (loglevel !== -1) {
    options.loglevel = loglevel;
  }
}
if (!Object.prototype.hasOwnProperty.call(options, 'loglevel')) {
  options.loglevel = 0;
}

options.parsedurl = _url2.default.parse(options.url, true);

exports.default = options;