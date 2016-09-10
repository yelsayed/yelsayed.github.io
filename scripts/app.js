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
        $routeProvider.otherwise({redirectTo: '/main/'});
    }])
    .controller('mainC', function ($scope, $timeout) {
        $timeout(function () {
            // method to be executed;
            document.querySelector("#myCard").classList.toggle("flip");
        }, 2500);

        $scope.viewLoaded = false;
        $scope.$on('$viewContentLoaded', function () {
            $scope.viewLoaded = true;
        });

    })
    .run(function () {
        // JQuery external libraries
        (function ($) {
            "use strict"; // Start of use strict

            // jQuery for page scrolling feature - requires jQuery Easing plugin
            $('a.page-scroll').bind('click', function (event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - 50)
                }, 1250, 'easeInOutExpo');
                event.preventDefault();
            });


            // Closes the Responsive Menu on Menu Item Click
            $('.navbar-collapse ul li a').click(function () {
                $('.navbar-toggle:visible').click();
            });

            // Fit Text Plugin for Main Header
            $("h1").fitText(
                1.2, {
                    minFontSize: '35px',
                    maxFontSize: '65px'
                }
            );

            // Offset for Main Navigation
            $('#mainNav').affix({
                offset: {
                    top: 100
                }
            });

            // Initialize WOW.js Scrolling Animations
            new WOW().init();

        })(jQuery); // End of use strict

    });
