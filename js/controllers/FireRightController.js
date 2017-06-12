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

            var i = 0;
            var bar = [
                [{
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
                }],
                [{
                    name: "加油站",
                    value: 12
                }, {
                    name: "棉花厂",
                    value: 36
                }, {
                    name: "面粉厂",
                    value: 22
                }, {
                    name: "小吃餐馆",
                    value: 16
                }, {
                    name: "粮仓",
                    value: 28
                }]
            ];

            setInterval(function() {
                i = (i + 1) % 2;
                vm.bar = bar[i];
            }, 3000);
        }])
})(angular);
