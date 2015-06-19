
#!/usr/bin/env node

var restify = require('restify');
var exec = require('child_process').exec;
var fs = require('fs');

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

server.get('/q/listservices', function(req, res, next){
	fs.readdir('.', function(err, files){
		if (err){
			throw err;
		}else{
			res.send(JSON.stringify(files));
		}
		next();
	});
});

server.get('/q/listsubservices/:name', function(req, res, next){
	fs.readdir('./' + req.params.name, function(err, files){
		if (err){
			throw err;
		}else{
			res.send(JSON.stringify(files));
		}
		next();
	});
});

server.get('/q/service/:name/:direction', function(req, res, next){
	fs.readFile('./' + req.params.name + '/' + req.params.direction + '/resourceList', function(err, data){
		if (err)throw err;
		else{
			res.send(data);
		}
		next();
	});
});

server.get('/bind', function(req, res, next){

});

server.get('/run', function(req, res, next){

});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});