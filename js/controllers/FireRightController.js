/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.controllers')
        .controller('FireRightController', ['$scope', '$timeout', function ($scope, $timeout) {
            var vm = $scope.vm = {
                brigades: [{
                    name: '东湖高新大队',
                    distance: '10.4km',
                    time: '20min'
                }, {
                    name: '东湖高新大队',
                    distance: '10.4km',
                    time: '20min'
                }, {
                    name: '东湖高新大队',
                    distance: '10.4km',
                    time: '20min'
                }, {
                    name: '东湖高新大队',
                    distance: '10.4km',
                    time: '20min'
                }]
            };
            var sun = document.getElementById('sun');
            var cloud = document.getElementById('cloud');

            sun.style.transition = sun.style.WebkitTransition = 'none';
            sun.style.transition = sun.style.WebkitTransition = 'transform 0.5s ease-in-out 0.5s';
            cloud.style.transition = cloud.style.WebkitTransition = 'transform 0.5s ease-in-out 0.5s';
            sun.style.transform = 'translate(16px, 16px)';
            cloud.style.transform = 'translate(-12px, 0)';

            $timeout(function () {
                sun.style.transform = 'none';
                cloud.style.transform = 'none';
            }, 500);


        }])
})(angular);