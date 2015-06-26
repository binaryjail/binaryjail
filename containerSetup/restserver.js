#!/usr/bin/env node
function qualifiedNameReduce( name ) {
	var dotPos=name.lastIndexOf('.');
	var qualifier=name.slice(0,dotPos);
	var nameElem=name.slice(dotPos + 1);
	return { qualifier: qualifier,
		  name: nameElem
		};
}

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
	fs.readdir('/services/', function(err, files){
		if (err){
			throw err;
		}else{
			res.send(JSON.stringify(files));
		}
		next();
	});
});

server.get('/q/listsubservices/:name', function(req, res, next){
	fs.readdir('/services/' + req.params.name + '/services/', function(err, files){
		if (err){
			throw err;
		}else{
			var serviceNames=[];
			files.forEach( function (element, index){
				serviceNames.push(req.params.name + '.' + element);
				});
			res.send(JSON.stringify(serviceNames));
		}
		next();
	});
});

server.get('/q/listresources/:name/:direction', function(req, res, next){
 
        var serviceName=qualifiedNameReduce ( String(req.params.name) )
	fs.readFile('/services/' + serviceName.qualifier + '/services/' + serviceName.name + '/resource/' + req.params.direction + '/definition/resourceList', {encoding: 'utf-8'}, function(err, data){
		if (err)throw err;
		else{
			res.send(JSON.stringify(data));
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

