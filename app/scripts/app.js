'use strict';

angular.module('domtree', ['domtree.directives', 'domtree.services', 'domtree.controllers']).config(function ($routeProvider) {
    // Set up router
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).when('gettree?:url',{
            controller: 'MainCtrl',
            resolve:{ tree: ['treeLoader',  function(treeLoader){
                return treeLoader();
            }]},
            templateUrl: 'views/main.html'
        })


        .otherwise({
            redirectTo: '/'
        });
});