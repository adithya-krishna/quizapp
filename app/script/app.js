'use strict';

/**
 * @ngdoc overview
 * @name quizApp
 * @description
 * # quizApp
 *
 * Main module of the application.
 */

angular.module('quizApp',
    ['ui.router',
        'ngMaterial',
        'ngMessages',
        'ngProgress.provider',
        'ngStorage',
        'chart.js'
    ])
    /*----------  all constants used within the app  ----------*/
    .constant('_', window._)
    /*----------  loading icons and color palette used within the app  ----------*/
    .config(['$mdIconProvider', '$mdThemingProvider', function($mdIconProvider, $mdThemingProvider){
        $mdIconProvider
            .iconSet('avatars', 'app/images/icons/avatar-icons.svg', 24)
            .iconSet('navigation', 'app/images/icons/svg-sprite-navigation.svg', 24)
            .iconSet('content', 'app/images/icons/svg-sprite-content.svg', 24);

        $mdThemingProvider.theme('lightBlueTheme')
            .primaryPalette('light-blue')
            .accentPalette('red');
    }])
    .run(['$rootScope', '$state', '$window', 'sessionService', function ($rootScope, $state, $window, sessionService) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.progressbar.start();
            // if logged in, user cannot see login screen.
            if (toState.name == "login") {
                if (sessionService.isLoggedIn()) {
                    $state.transitionTo("main");
                    event.preventDefault();
                }
            }

            // check if logged in
            if (toState.authenticate && !sessionService.isLoggedIn()) {
                // here you can set states which can be viewed without logging in.
                $state.transitionTo("login");
                event.preventDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, data) {
            $rootScope.progressbar.complete();
            $rootScope.currentState = $state.current.name;
        });

        /*----------  attaches lodash to the window for use with angular. Read: http://stackoverflow.com/a/25086064  ----------*/
        $rootScope._ = window._;
    }])
    .controller("AppCtrl",
        ['$scope',
        '$rootScope',
        'ngProgressFactory',
        '$mdMedia',
        '$mdDialog',
        '$mdSidenav',
        function ($scope, $rootScope, ngProgressFactory) {
            $rootScope.progressbar = ngProgressFactory.createInstance();
            $rootScope.progressbar.setColor('#f1582c');
        }])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        /*----------  Routing within the app  ----------*/
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/questions');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/login.html',
                controller: 'LoginCtrl',
                authenticate: false
            })
            .state('questions', {
                url: '/questions',
                templateUrl: 'app/views/questions.html',
                controller: 'QuestionsCtrl',
                authenticate: true
            });
    }]);
