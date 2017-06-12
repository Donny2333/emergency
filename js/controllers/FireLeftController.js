/**
 * Created by Donny on 17/3/22.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.controllers')
        .controller('FireLeftController', ['$scope', function($scope) {
            var vm = $scope.vm = {
                level: 3
            };
        }])
})(angular);
