//'use strict';

angular.module('myApp.main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main/:resume', {
            templateUrl: 'scripts/main/main-temp.html',
            controller: 'mainController',
            controllerAs: 'mc'
        });
    }])

    .controller("mainController", function ($scope, $location, $anchorScroll, $routeParams, $timeout) {
        this.maxResumes = 4;

        var ctrl = this;

        ctrl.resumeData = [];

        this.initResume = function () {
            if ($routeParams.resume === null
                || $routeParams.resume === undefined
                || $routeParams.resume < 1
                || $routeParams.resume > this.maxResumes) {
                ctrl.resumeData = ctrl.resumeData1;
                $route.updateParams({"resume": 1});
                console.log("hellooooo");

            } else {
                console.log($routeParams.resume);
                if ($routeParams.resume === '1') {
                    ctrl.resumeData = ctrl.resumeData1;
                } else if ($routeParams.resume === '2') {
                    ctrl.resumeData = ctrl.resumeData2;
                } else if ($routeParams.resume === '3') {
                    ctrl.resumeData = ctrl.resumeData3;
                } else if ($routeParams.resume === '4') {
                    ctrl.resumeData = ctrl.resumeData3;
                }
            }
        };

        this.skillData =
            [
                {
                    header: "Web Development",
                    sub: [
                        {
                            subheader: "AngularJS",
                            subtitle: "I am highly proficient with Angular",
                            level: "90"
                        },
                        {
                            subheader: "Bootstrap",
                            subtitle: "I use Bootstrap heavily",
                            level: "80"
                        },
                        {
                            subheader: "CSS3",
                            subtitle: "I build components and animations using CSS3",
                            level: "75"
                        },
                        {
                            subheader: "Sketch",
                            subtitle: "I design my webapps before I code them.",
                            level: "70"
                        },
                        {
                            subheader: "Django",
                            subtitle: "I am an Intermediate with Django",
                            level: "65"
                        },
                        {
                            subheader: "JQuery",
                            subtitle: "I am an avid user Jquery",
                            level: "55"
                        },
                        {
                            subheader: "Passion",
                            subtitle: "Daddy I love him! var him = 'Web Dev'",
                            level: "100"
                        }
                    ]
                }
            ];

        this.projectData =
            [
                {
                    header: "This",
                    subheader: "My Personal site, you're browsing it right now.",
                    tools: [
                        {
                            name: "Angular",
                            logo: "angular.png"
                        },
                        {
                            name: "HTML5",
                            logo: "HTML5.png"
                        },
                        {
                            name: "CSS3",
                            logo: "css3.png"
                        }
                    ]
                }
            ];

        this.portfolio = [
            {
                title: "This",
                filter: "web",
                description: "This website you see now",
                src: "img/portfolios/logo/1.jpg",
                hlink: ""
            }, {
                title: "Buzzcast",
                filter: "app",
                description: "Aggregate social media to show events",
                src: "img/portfolios/app/2.jpg",
                hlink: ""
            }, {
                title: "Kesa",
                filter: "app",
                description: "Write stories with multiple storylines",
                src: "img/portfolios/app/3.jpg",
                hlink: ""
            }, {
                title: "Smart Syllabus",
                filter: "web",
                description: "Allows non-tech people to make create syllabi",
                src: "img/portfolios/logo/2.jpg",
                hlink: ""
            }, {
                title: "HTTPS Server",
                filter: "project",
                description: "Basic implementation of a secure webserver",
                src: "img/portfolios/card/1.jpg",
                hlink: ""
            }, {
                title: "Distributed FileSystem",
                filter: "project",
                description: "Basic implementation of distributed filesystem",
                src: "img/portfolios/card/2.jpg",
                hlink: ""
            }, {
                title: "BitTorrent File transfer",
                filter: "project",
                description: "BitTorrent-like File transfer over multiple peers",
                src: "img/portfolios/card/3.jpg",
                hlink: ""
            }
        ];

        this.initResume();

        $scope.animateBar = function (elem, perc, sing) {
            if (sing == true) {

            } else {
                for (var i = 0; i <= perc; i++) {
                    elem.css("width", i.toString() + '%');
                }
            }
        };

        this.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        $timeout(function () {
            $(function () {

                var filterList = {

                    init: function () {

                        // MixItUp plugin
                        // http://mixitup.io
                        $('#portfoliolist').mixItUp({
                            selectors: {
                                target: '.portfolio',
                                filter: '.filter'
                            },
                            load: {
                                filter: '.app'
                            }
                        });

                    }

                };

                // Run the show!
                filterList.init();


            });
        }, 0);

    })

    .directive('scroll', function ($window) {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                angular.element($window).bind("scroll", function () {
                    var topOfWindow = $window.scrollY;
                    if (element.offset().top < topOfWindow + (($window.innerHeight * 3) / 4)) {
                        scope.animateBar(element, attr.perc, attr.sing);
                        attr.sing = true;
                    }
                    scope.$apply();
                });
            }
        }
    });