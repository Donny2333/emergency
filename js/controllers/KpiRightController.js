/**
 * Created by Donny on 17/5/26.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.controllers')
        .controller('KpiRightController', ['$scope', 'Http', 'EChartsFactory', function($scope, Http, EChartsFactory) {
            var vm = $scope.vm = {
                charts: []
            };
            var charts = [{
                "type": "bar",
                "id": 2,
                "title": "各乡镇扶贫情况",
                "dataSource": "json/data2.json",
                "style": {
                    "height": "220px",
                    "width": "100%",
                    "float": "none"
                }
            }, {
                "type": "map",
                "id": 4,
                "title": "贫困人口分布图",
                "dataSource": "json/data4.json",
                "style": {
                    "margin-top": "10px",
                    "padding-left": "10px",
                    "padding-right": "30px",
                    "height": "220px",
                    "width": "100%",
                    "float": "none"
                }
            }];
            Http.get('json/GeoJSON.json').then(function(res) {
                echarts.registerMap('LHK', res.data);

                charts.map(function(chart) {
                    var newChart = EChartsFactory(chart.type);
                    newChart.id = chart.id;
                    newChart.title = chart.title;
                    newChart.type = chart.type;
                    newChart.dataSource = chart.dataSource;
                    newChart.x = chart.x;
                    newChart.y = chart.y;
                    newChart.style = chart.style;

                    newChart.update(chart);
                    vm.charts.push(newChart);
                })
            });
        }])
})(angular);
