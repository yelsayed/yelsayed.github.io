'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'myApp.main',
        'myApp.articles',
        'myApp.projects',
        'myApp.contact',
        'myApp.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main/1'});
    }])
    .controller('mainC', function () {
        setInterval(function () {
            // method to be executed;
            document.querySelector("#myCard").classList.toggle("flip");
        }, 5000);

    });
