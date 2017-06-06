/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency', [
        'ngAnimate',
        'FBAngular',
        'emergency.config',
        'emergency.routers',
        'emergency.directives',
        'emergency.services',
        'emergency.controllers'
    ]).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
    }]);

})
(angular);