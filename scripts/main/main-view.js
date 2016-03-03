//'use strict';

angular.module('myApp.main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'scripts/main/main-temp.html',
            controller: 'mainController',
            controllerAs: 'mc'
        });
    }])

    .controller("mainController", function ($scope, $location, $anchorScroll) {

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
            //    {
            //    header: "Programming Languages",
            //    sub: [
            //        {
            //            subheader: "JavaScript",
            //            subtitle: "Functional Web Development",
            //            level: "90"
            //        },
            //        {
            //            subheader: "SML",
            //            subtitle: "Functional and Logic Programming",
            //            level: "80"
            //        },
            //        {
            //            subheader: "C",
            //            subtitle: "Core Systems Programming",
            //            level: "75"
            //        },
            //        {
            //            subheader: "Java",
            //            subtitle: "Object Oriented Software Construction",
            //            level: "70"
            //        },
            //        {
            //            subheader: "Python",
            //            subtitle: "Back End Web Development",
            //            level: "65"
            //        }
            //    ]
            //},
            //    {
            //        header: "Actual Languages",
            //        sub: [
            //            {
            //                subheader: "Arabic",
            //                subtitle: "الحمد لله على اللغة العربية",
            //                level: "100"
            //            },
            //            {
            //                subheader: "English",
            //                subtitle: "This is my second language but I probably more familiar with this than Arabic",
            //                level: "100"
            //            },
            //            {
            //                subheader: "French",
            //                subtitle: "Je parle un petit peu de Français",
            //                level: "15"
            //            }
            //        ]
            //    }
            ];

        this.projectData =
            [
                {
                    header: "This",
                    subheader: "My Personal site, you're browsing it right now.",
                    tools:
                        [
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

        this.resumeData =
            [
                {
                    entry: "experience",
                    sub: [
                        {
                            sub_header: "15-199 CMU Teaching Assistant",
                            sub_points: [
                                "15-199 is a course that introduces first year students to elements of formal logic as well as the historical context in which it was founded.",
                                "Responsible for answering course-related questions from the students.",
                                "Responsible for holding lectures introducing logic programming."
                            ],
                            date: "Fall 2015"
                        },
                        {
                            sub_header: "Metis Full-Time Front-End Developer",
                            sub_points: [
                                "Metis is an application that aids students in their course planning, scheduling and discovery through their 4-6 years of University.",
                                "Responsible for developing core front-end features.",
                                "Responsible for creating and maintaining code that provides information about courses and is the most used feature of the application."
                            ],
                            date: "Summer 2015"
                        }
                    ]
                },
                {
                    entry: "Projects",
                    sub: [
                        {
                            sub_header: "Carnegie Apps Winner, Challenge 22 Finalist, Buzzcast",
                            sub_points: [
                                "Buzzcast is a tool that aggregates multiple social media feeds into one interface that shows users events based on location.",
                                "Developed, Designed and Pitched to 100+ people in total.",
                                "Reached final 18 teams chosen out of 355 teams chosen through 3 rounds.",
                                "Built a Development plan that incorporated multiple developers and a detailed walkthrough of how the app will be fully developed and tested.",
                                "App was recognized by Ooredoo and was awarded Best Technical challenge in a Carnegie Apps Hackathon at CMU."
                            ],
                            date: "Jul 2015"
                        },
                        {
                            sub_header: "HTTPS Server",
                            sub_points: [
                                "Implemented a real, concrete, and secure Web Server used for hosting content using C Programming Language.",
                                "Web server can be launched to host dynamic/static web content.",
                                "Strengthened the reliability to handle 10,000+ clients simultaneously.",
                                "Encrypts connections between the server and client using SSL enabling secure communication between the client and server."
                            ],
                            date: "Jan-Feb 2016"
                        },
                        {
                            sub_header: "Jeebly",
                            sub_points: [
                                "Founded and developed a service for students to avoid the hassles of online shopping in Qatar.",
                                "Conducted 50+ customer development interviews for feature ideation.",
                                "Launched a web service on Jeebly.me for people to place their orders on."
                            ],
                            date: "Sept – Dec 2015"
                        },
                        {
                            sub_header: "Smart Syllabus for non-technical users",
                            sub_points: [
                                "Programmed, designed and deployed a webapp for 79-104 in CMU to ease the process of creating and updating syllabi for non technical users.",
                                "Currently Maintaining it on http://www.qatar.cmu.edu/~breilly2/world/.",
                                "Launched a web service on Jeebly.me for people to place their orders on.",
                                "Created an interactive navigation + calendar system that takes the user’s input and updates the calendar with the appropriate links and colors."
                            ],
                            date: "Sept – Dec 2015"
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