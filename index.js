var bunyan = require('bunyan');
var blackhole = require('bunyan-blackhole');
var path = require('path');

var appName = path.basename(__dirname.substring(0, __dirname.indexOf('node_modules')));

switch (process.env.NODE_LOG) {
  case undefined:
    module.exports = bunyan.createLogger({
      name: appName,
      level: 10 // trace
    });
    break;

  case 'testing':
    module.exports = blackhole();
    break;

  default:
    console.log('assuming a path');
    module.exports = bunyan.createLogger({
      name: appName,
      streams: [{
        level: 30, // info
        path: process.env.NODE_LOG
      }]
    });
    break;
}
