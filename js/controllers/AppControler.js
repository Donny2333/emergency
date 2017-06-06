/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.controllers', [])
        .controller('AppController', ['$scope', '$rootScope', 'Route', function ($scope, $rootScope, Route) {
            $scope.toggleFullScreen = function () {
                $rootScope.isFullscreen = !$rootScope.isFullscreen;
            };

            var url = 'http://192.168.250.45:6080/arcgis/rest/services/ThemeMap/MapServer';
            var extent = [111.63519615524577, 32.373406903804636, 111.72406902381353, 32.413810151683634];
            var projection = new ol.proj.Projection({
                code: 'EPSG:4490',
                units: 'degrees'
            });
            var map = new ol.Map({
                target: 'map',
                layers: [new ol.layer.Image()],
                controls: [],
                view: new ol.View({
                    center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
                    extent: extent,
                    projection: projection
                })
            });

            var size = map.getSize();
            var resolution = (extent[2] - extent[0]) / size[0];
            map.getView().setResolution(resolution);


            initMap(url);
            Route.drive({
                origin: '116.32259,39.97554',
                destination: '116.32259,38'
            }).then(function (res) {
                if (res.status === 200) {
                    console.log(res.data.result);
                } else {
                    console.error(res);
                }
            }, function (err) {
                console.error(err);
            });

            function initMap(url, params) {
                map.getLayers().item(0).setSource(new ol.source.ImageArcGISRest({
                    url: url,
                    params: params || {}
                }));
            }
        }])
})(angular);