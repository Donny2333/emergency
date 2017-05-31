/**
 * Created by Donny on 17/3/22.
 */
(function () {
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
                    templateUrl: './tpls/fire.html',
                    controller: 'FireController'
                })
                .state('app.transport', {
                    url: '/transport',
                    templateUrl: './tpls/transport.html',
                    controller: 'TransportController'
                })
                .state('app.call', {
                    url: '/call',
                    templateUrl: './tpls/call.html',
                    controller: 'CallController'
                })
                .state('app.video', {
                    url: '/video',
                    templateUrl: './tpls/video.html',
                    controller: 'VideoController'
                })
        }]);

}());