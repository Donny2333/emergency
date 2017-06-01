/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency', [
        'ngAnimate',
        'FBAngular',
        'emergency.routers',
        'emergency.directives',
        'emergency.services',
        'emergency.controllers'
    ]);

})(angular);