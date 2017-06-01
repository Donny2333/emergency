/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.controllers', [])
        .controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.toggleFullScreen = function () {
                $rootScope.isFullscreen = !$rootScope.isFullscreen;
            };

            var url = 'http://192.168.250.45:6080/arcgis/rest/services/ThemeMap/MapServer';
            // var extent = [111.63519615524577, 32.373406903804636, 111.72406902381353, 32.413810151683634];
            var extent = [12426884.777, 3812409.2678, 12433705.749, 3815674.2327];
            var projection = new ol.proj.Projection({
                code: 'EPSG:4490',
                // units: 'm'
            });
            var map = new ol.Map({
                target: 'map',
                layers: [new ol.layer.Image()],
                view: new ol.View({
                    center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
                    // zoom: 15,
                    extent: extent,
                    // projection: projection,
                    resolution: 96
                })
            });


            initMap(url);


            function initMap(url, params) {
                map.getLayers().item(0).setSource(new ol.source.ImageArcGISRest({
                    url: url,
                    params: params || {}
                }));
            }
        }])
})(angular);