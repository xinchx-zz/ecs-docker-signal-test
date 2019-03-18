'use strict';

var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000, '0.0.0.0');

console.log('server started');

var signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};

function shutdown(signal, value) {
  server.close(function () {
    console.log('server stopping by ' + signal);
    setTimeout(function() {
      console.log('1700 secs passed. I am still here.');
      setTimeout(function() {
        console.log('60 secs passed. I am still here.');
        setTimeout(function() {
          console.log('60 secs passed. I may not be here.');
          setTimeout(function() {
            console.log('another 60 secs passed. I will exit myself.');
            process.exit(128 + value);
          }, 60000); //60s
        }, 60000); //60s
      }, 60000); //60s
    }, 1700000); //1700s
  });
}

Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});
