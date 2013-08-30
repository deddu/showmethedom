'use strict';

angular.module('showmethedomApp', []).config(function ($routeProvider) {
    // Set up router
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });