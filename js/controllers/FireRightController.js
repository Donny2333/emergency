/**
 * Created by Donny on 17/3/22.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.controllers')
        .controller('FireRightController', ['$scope', '$timeout', function($scope, $timeout) {
            var vm = $scope.vm = {
                brigades: [{
                    name: '老河口消防大队',
                    distance: '10.4km',
                    time: '10min'
                }, {
                    name: '老河口消防中队',
                    distance: '15.4km',
                    time: '18min'
                }, {
                    name: '老河口消防支队',
                    distance: '20.4km',
                    time: '20min'
                }],
                weibos: [{
                    avatar: '/images/avatar1.png',
                    author: '夏至未至',
                    telephone: '180****3370',
                    content: '好大的火啊！'
                }, {
                    avatar: '/images/avatar2.png',
                    author: '吃鱼的小猫',
                    telephone: '188****0697',
                    content: '火势越来越大了，希望没有人受伤啊！'
                }, {
                    avatar: '/images/avatar2.png',
                    author: '小米酱',
                    telephone: '186****7182',
                    content: '我打了电话了，消防员马上到！'
                }, {
                    avatar: '/images/avatar2.png',
                    author: '吃鱼的小猫',
                    telephone: '188****0697',
                    content: '消防队怎么还不到！'
                }],
                bar: [{
                    name: "燃料仓库",
                    value: 40
                }, {
                    name: "油库",
                    value: 15
                }, {
                    name: "燃气设施",
                    value: 25
                }, {
                    name: "化工厂",
                    value: 35
                }, {
                    name: "烟花仓库",
                    value: 20
                }]
            };

            var i = 0;
            var bar = [
                [{
                    name: "燃料仓库",
                    value: 40
                }, {
                    name: "油库",
                    value: 15
                }, {
                    name: "燃气设施",
                    value: 25
                }, {
                    name: "化工厂",
                    value: 35
                }, {
                    name: "烟花仓库",
                    value: 20
                }],
                [{
                    name: "加油站",
                    value: 10
                }, {
                    name: "棉花厂",
                    value: 35
                }, {
                    name: "面粉厂",
                    value: 20
                }, {
                    name: "小吃餐馆",
                    value: 15
                }, {
                    name: "粮仓",
                    value: 30
                }]
            ];

            setInterval(function() {
                i = (i + 1) % 2;
                vm.bar = bar[i];
            }, 3000);
        }])
})(angular);
