#!/usr/bin/env node

var express = require('express');
var fs = require('fs');
var $ = require('jquery');

var app = express();

app.use('/app', express.static(__dirname + '/app'));

// FIXME: Make jquery extension?
var jqDOMtoJSON = function($dom) {
	'use strict';
	var maybe = function(p, x) {
		return x ? p + x : '';
	};
	var result = {};

	var classes = maybe('.', $($dom)
		.attr('class')).split(' ').join('.');
	var id = maybe('#', $($dom)
		.attr('id'));
	result.name = $dom.nodeName + classes + id;
	if ($dom.children.length) {
		result.children = $.map($dom.children, jqDOMtoJSON);
	}
	return result;
};

app.get('/gettree', function(request, response) {
	'use strict';
	console.log('Trying to get ' + request.query.url);
	$.get(request.query.url, function(data) {
		var $dom = {
			nodeName: '#document',
			children: $($.parseHTML(data))
				.get()[0].parentNode.children
		};
		// FIXME: Handle exceptions gracefully
		var treeData = jqDOMtoJSON($dom);
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});
		response.write(JSON.stringify(treeData));
		response.end();
	});
});


var index = './app/index.html';
app.get('/', function(request, response) {
	'use strict';
	fs.readFile(index, function read(err, data) {
		if (err) {
			response.writeHead(400, {
				'Content-Type': 'text/plain'
			});
			response.write('index not found');
			response.end();
		}

		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write(data);
		response.end();
	});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
	'use strict';
	console.log('Listening on http://localhost:' + port);
});
