var bunyan = require('bunyan');
var blackhole = require('bunyan-blackhole');

switch (process.env.NODE_LOG) {
  case undefined:
    module.exports = bunyan.createLogger({
      name: 'developments',
      level: 10 // trace
    });
    break;

  case 'testing':
    module.exports = blackhole();
    break;

  default:
    console.log('assuming a path');
    module.exports = bunyan.createLogger({
      name: 'production',
      streams: [{
        level: 30, // info
        path: process.env.NODE_LOG
      }]
    });
    break;
}
