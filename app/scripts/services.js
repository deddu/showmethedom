var services = angular.module('domtree.services', ['ngResource']);
services.factory('Tree',['$resource',
    function($resource){
        return $resource('/gettree?url=:mainURL',{mainURL:"@mainURL"},{method:'GET', isArray:false})
    }
]);

services.factory('treeLoader', ['Tree','$route','$q',
    function(Tree, $route, $q){
        return function(){
            var delay = $q.defer();
            Tree.get({url: $route.current.params.url}, function(tree){
                delay.resolve(tree);
            }, function(){
                delay.reject('unable to fetch url: ' + $route.current.params.url);
            });
            return delay.promise;
        };
    }]);