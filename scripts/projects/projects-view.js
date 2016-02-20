'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'scripts/projects/projects-temp.html',
    controller: 'projectsCtrl'
  });
}])

.controller('projectsCtrl', [function() {

}]);