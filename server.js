var config = require('./config');

var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var httpPort = process.env.PORT || config.server.httpPort;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/build'));

// Error handler
app.use(function(err, req, res, next){
  if (!err) return next();
  console.error("Error");
  console.error(err);
  res.json(err.statusCode, { code: 1, message: "Error."});
});

//app.use(express.favicon(__dirname + '/build/images/favicon.ico'));

var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
console.log('HTTP server listening port ' + httpPort);
});

app.get('*', function(req, res) {
  res.sendfile('build/index.html', { root: path.join(__dirname) });
});