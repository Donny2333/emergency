/**
 * Created by Donny on 17/3/22.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.controllers')
        .controller('FireRightController', ['$scope', '$timeout', function($scope, $timeout) {
            var vm = $scope.vm = {
                brigades: [{
                    name: '老河口高新大队',
                    distance: '10.4km',
                    time: '20min'
                }, {
                    name: '老河口高新大队',
                    distance: '10.4km',
                    time: '20min'
                }, {
                    name: '老河口高新大队',
                    distance: '10.4km',
                    time: '20min'
                }],
                dateTime: {
                    time: '16:39',
                    date: '6月11日',
                    nongli: '五月十七'
                },
                weibos: [{
                    avatar: '/images/avatar1.png',
                    author: '吃鱼的小猫',
                    telephone: '188****0697',
                    content: '火势越来越大了，希望没有人受伤啊！'
                }, {
                    avatar: '/images/avatar2.png',
                    author: '吃鱼的小猫',
                    telephone: '188****0697',
                    content: '火势越来越大了，希望没有人受伤啊！'
                }, {
                    avatar: '/images/avatar2.png',
                    author: '吃鱼的小猫',
                    telephone: '188****0697',
                    content: '火势越来越大了，希望没有人受伤啊！'
                }, {
                    avatar: '/images/avatar2.png',
                    author: '吃鱼的小猫',
                    telephone: '188****0697',
                    content: '火势越来越大了，希望没有人受伤啊！'
                }],
                bar: [{
                    name: "燃料仓库",
                    value: 38
                }, {
                    name: "油库",
                    value: 16
                }, {
                    name: "燃气设施",
                    value: 26
                }, {
                    name: "化工厂",
                    value: 36
                }, {
                    name: "烟花仓库",
                    value: 22
                }]
            };

            setInterval(function() {
                vm.bar = [{
                    name: "燃料仓库",
                    value: Math.random() * 40
                }, {
                    name: "油库",
                    value: Math.random() * 40
                }, {
                    name: "燃气设施",
                    value: Math.random() * 40
                }, {
                    name: "化工厂",
                    value: Math.random() * 40
                }, {
                    name: "烟花仓库",
                    value: Math.random() * 40
                }];
            }, 3000);

            var sun = document.getElementById('sun');
            var cloud = document.getElementById('cloud');

            sun.style.transition = sun.style.WebkitTransition = 'none';
            sun.style.transition = sun.style.WebkitTransition = 'transform 0.5s ease-in-out 0.5s';
            cloud.style.transition = cloud.style.WebkitTransition = 'transform 0.5s ease-in-out 0.5s';
            sun.style.transform = 'translate(16px, 16px)';
            cloud.style.transform = 'translate(-12px, 0)';

            $timeout(function() {
                sun.style.transform = 'none';
                cloud.style.transform = 'none';
            }, 500);
        }])
})(angular);
