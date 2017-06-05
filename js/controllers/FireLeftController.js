/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.controllers')
        .controller('FireLeftController', ['$scope', '$timeout', function ($scope, $timeout) {
            var vm = $scope.vm = {
                level: 3
            };
            var path = document.querySelector('#house path');
            var length = path.getTotalLength();
            // 清除之前的动作
            path.style.transition = path.style.WebkitTransition = 'none';
            // 设置起始点
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // 获取一个区域，获取相关的样式，让浏览器寻找一个起始点。
            path.getBoundingClientRect();
            // 定义动作
            path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 3s 0.2s ease-in-out';
            // Go!
            path.style.strokeDashoffset = '0';
        }])
})(angular);