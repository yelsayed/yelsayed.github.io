'use strict';

angular.module('myApp.articles', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/articles', {
            templateUrl: 'scripts/articles/article-temp.html',
            controller: 'articlesCtrl'
        });
    }])

    .controller('articlesCtrl', [function () {
        console.log("article");
    }]);