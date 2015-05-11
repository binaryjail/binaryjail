#!/usr/bin/env node

var restify = require('restify');
var exec = require('child_process').exec;

var version = '0.0.1';

var server = restify.createServer({
  name: 'binaryjail',
  version: version
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/run/:name', function (req, res, next) {
  res.send(req.params);
  console.log('Running ' + req.params.name);
	var child = exec('/' + req.params.name,
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
	console.log('Done...');

  return next();
});

server.get('/version', function (req, res, next) {
  res.send(version);
  console.log(version);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});