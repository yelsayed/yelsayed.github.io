'use strict';

angular.module('myApp.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'scripts/contact/contact-temp.html',
    controller: 'contactCtrl'
  });
}])

.controller('contactCtrl', [function() {

}]);