#!/usr/bin/env node

var express = require('express');
var fs = require('fs');
var $ = require('jquery');

var app = express();

app.use("/app", express.static(__dirname + '/app'));

// FIXME: Make jquery extension?
var jqDOMtoJSON = function($dom) {
	return {
		name: $dom.nodeName,
		children: $.map($dom.children, jqDOMtoJSON)
	};
};

app.get('/gettree', function(request, response) {
	console.log("Trying to get " + request.query.url);
	$.get(request.query.url, function(data) {
		// FIXME: Handle exceptions gracefully
		var treeData = jqDOMtoJSON($($.parseHTML(data))
			.get()[0].parentNode);
		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify(treeData));
		response.end();
	});
});


var index = './app/index.html';
app.get('/', function(request, response) {
	fs.readFile(index, function read(err, data) {
		if (err) {
			throw err;
			response.writeHead(400, {
				"Content-Type": "text/plain"
			});
			response.write("index not found");
			response.end();
		}
		content = data;
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		response.write(content);
		response.end();
	});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
	//readfile()
	console.log("Listening on http://localhost:" + port);
});
