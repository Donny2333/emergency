/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.routers', ['ui.router'])
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/app/fire');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: './tpls/app.html',
                    controller: 'AppController'
                })
                .state('app.fire', {
                    url: '/fire',
                    views: {
                        left: {
                            templateUrl: './tpls/fire/left.html',
                            controller: 'FireController'
                        },
                        right: {
                            templateUrl: './tpls/fire/right.html',
                            controller: 'FireController'
                        }
                    }
                })
                .state('app.transport', {
                    url: '/transport',
                    views: {
                        left: {
                            templateUrl: './tpls/transport/left.html',
                            controller: 'TransportController'
                        },
                        right: {
                            templateUrl: './tpls/transport/right.html',
                            controller: 'TransportController'
                        }
                    }
                })
                .state('app.call', {
                    url: '/call',
                    views: {
                        left: {
                            templateUrl: './tpls/call/left.html',
                            controller: 'CallController'
                        },
                        right: {
                            templateUrl: './tpls/call/right.html',
                            controller: 'CallController'
                        }
                    }
                })
                .state('app.video', {
                    url: '/video',
                    views: {
                        left: {
                            templateUrl: './tpls/video/left.html',
                            controller: 'VideoController'
                        },
                        right: {
                            templateUrl: './tpls/video/right.html',
                            controller: 'VideoController'
                        }
                    }
                })
        }]);

})(angular);