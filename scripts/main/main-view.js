//'use strict';

angular.module('myApp.main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main/', {
            templateUrl: 'scripts/main/main-temp.html',
            controller: 'mainController',
            controllerAs: 'mc'
        });
    }])

    .controller("mainController", function ($scope, $location, $anchorScroll, $routeParams, $timeout) {

        var ctrl = this;

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
                            level: "85"
                        },
                        {
                            subheader: "CSS3",
                            subtitle: "I build components and animations using CSS3",
                            level: "80"
                        },
                        {
                            subheader: "Sketch",
                            subtitle: "I design my webapps before I code them.",
                            level: "70"
                        },
                        {
                            subheader: "Django",
                            subtitle: "I am an Intermediate with Django",
                            level: "75"
                        },
                        {
                            subheader: "jQuery",
                            subtitle: "I am an avid user of jQuery",
                            level: "65"
                        },
                        {
                            subheader: "Passion",
                            subtitle: "Check out my portfolio, you'll see my passion.",
                            level: "100"
                        }
                    ]
                }
            ];

        this.portfolio = [
            {
                title: "This",
                filter: "web",
                description: "This website you see now",
                src: "img/portfolios/web/ysrsayed.png",
                hlink: "#",
                tools: [
                    {
                        name: "Angular",
                        logo: "img/tools/angular.png"
                    },
                    {
                        name: "Bootstrap",
                        logo: "img/tools/bootstrap.png"
                    },
                    {
                        name: "CSS3",
                        logo: "img/tools/css3.png"
                    }
                ]
            }, {
                title: "Buzzcast",
                filter: "app",
                description: "Aggregate social media to show events",
                src: "img/portfolios/app/buzzcast.png",
                hlink: "https://medium.com/@ysr.sayed/buzzcast-how-far-can-you-take-an-idea-56f123c92ee7#.wmk03on71",
                tools: [
                    {
                        name: "jQuery",
                        logo: "img/tools/angular.png"
                    },
                    {
                        name: "Bootstrap",
                        logo: "img/tools/bootstrap.png"
                    },
                    {
                        name: "CSS3",
                        logo: "img/tools/css3.png"
                    },
                    {
                        name: "Django",
                        logo: "img/tools/django.png"
                    }
                ]
            }, {
                title: "Kesa",
                filter: "app",
                description: "Write stories with multiple storylines",
                src: "img/portfolios/app/kesa.png",
                hlink: "http://www.kesa.io",
                tools: [
                    {
                        name: "Angular",
                        logo: "img/tools/angular.png"
                    },
                    {
                        name: "Bootstrap",
                        logo: "img/tools/bootstrap.png"
                    },
                    {
                        name: "D3",
                        logo: "img/tools/d3.png"
                    },
                    {
                        name: "Django",
                        logo: "img/tools/django.png"
                    }

                ]
            }, {
                title: "Smart Syllabus",
                filter: "web",
                description: "Allows non-tech people to make create syllabi",
                src: "img/portfolios/web/syllabus.png",
                hlink: "http://www.qatar.cmu.edu/~breilly2/world/",
                tools: [
                    {
                        name: "Angular",
                        logo: "img/tools/angular.png"
                    },
                    {
                        name: "Bootstrap",
                        logo: "img/tools/bootstrap.png"
                    },
                    {
                        name: "CSS3",
                        logo: "img/tools/css3.png"
                    }

                ]
            }, {
                title: "HTTPS Server",
                filter: "project",
                description: "Basic implementation of a secure webserver",
                src: "img/portfolios/card/1.jpg",
                hlink: "https://github.com/yelsayed/Lisod-Webserver",
                tools: [
                    {
                        name: "C",
                        logo: "img/tools/c.png"
                    },
                    {
                        name: "SSL",
                        logo: "img/tools/secure.png"
                    }
                ]
            }, {
                title: "Distributed FileSystem",
                filter: "project",
                description: "Basic implementation of distributed filesystem",
                src: "img/portfolios/card/2.jpg",
                hlink: "https://github.com/yelsayed/Distributed-Filesystem",
                tools: [
                    {
                        name: "Java",
                        logo: "img/tools/Java_avatar.png"
                    }
                ]
            }, {
                title: "BitTorrent File transfer",
                filter: "project",
                description: "BitTorrent-like File transfer over multiple peers",
                src: "img/portfolios/card/3.jpg",
                hlink: "https://github.com/mfituri/15-441-Project-2",
                tools: [
                    {
                        name: "C",
                        logo: "img/tools/c.png"
                    }
                ]
            }
        ];

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
            $('[data-toggle="tooltip"]').tooltip().show();
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
                                filter: '.all, .app, .project, .web, .article'
                            }
                        });

                    }

                };

                // Run the show!
                filterList.init();


            });
        }, 0);

        this.changeLocation = function (x) {
            var win = window.open(x, '_blank');
            win.focus();
        };

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