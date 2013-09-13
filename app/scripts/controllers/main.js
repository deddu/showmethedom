'use strict';

angular.module('showmethedomApp').controller('MainCtrl', function($scope, $http) {
	$scope.d3update = function() {
		// Create a svg canvas
		var height = 1000,
			width = 400;

		d3.select('.d3output')
			.selectAll('svg')
			.remove();

		var vis = (d3.select('.d3output')
			.append('svg')
			.attr('height', height)
			.attr('width', width * 2)
			.append('svg:g')
			.attr('transform', 'translate(200, 0)')); // shift everything to the right

		// Create a tree 'canvas'
		var tree = d3.layout.cluster()
			.size([height, width]);

		var diagonal = d3.svg.diagonal()
		//.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
		// change x and y (for the left to right tree)
		.projection(function(d) {
			return [d.y, d.x];
		});


		// Preparing the data for the tree layout, convert data into an array of nodes
		var nodes = tree.nodes($scope.treeData);
		// Create an array with all the links
		var links = tree.links(nodes);

		vis.selectAll('pathlink')
			.data(links)
			.enter()
			.append('svg:path')
			.attr('class', 'link')
			.attr('d', diagonal);

		var node = vis.selectAll('g.node')
			.data(nodes)
			.enter()
			.append('svg:g')
			.on('click', function(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			$scope.d3update();
		})
			.attr('transform', function(d) {
			return 'translate(' + d.y + ',' + d.x + ')';
		});

		// Add the dot at every node
		node.append('svg:circle')
			.attr('class', function(d) {
			return d._children ? 'node collapsed' : d.children ? 'node branch' : 'node leaf';
		})
			.attr('r', 3.5);

		// place the name atribute left or right depending if children
		node.append('svg:text')
			.attr('dx', function(d) {
			return d.children ? -8 : 8;
		})
			.attr('dy', 3)
			.attr('text-anchor', function(d) {
			return d.children ? 'end' : 'start';
		})
			.text(function(d) {
			return d.name;
		});
	};
	
	$scope.submit = function() {
		$http.get('/gettree?url=' + this.mainURL)
			.success(function(data) {
			$scope.treeData = data;
			$scope.d3update();
		});
	};

});
