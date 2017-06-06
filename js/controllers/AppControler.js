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
            var truckPos1 = [111.688, 32.38];
            var truckPos2 = [111.7, 32.4];
            var firePos = [111.682, 32.392];
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
            drawLine(truckPos1, firePos, '#aeea92');
            drawLine(truckPos2, firePos);
            drawTrucks([truckPos1, truckPos2]);


            function initMap(url, params) {
                map.getLayers().item(0).setSource(new ol.source.ImageArcGISRest({
                    url: url,
                    params: params || {}
                }));
            }

            function drawTrucks(pos) {
                var trucks = [];
                pos.map(function (point) {
                    trucks.push(new ol.Feature(new ol.geom.Point(point)));
                });
                var layerTrucks = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: trucks
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                            anchor: [0.2, 18],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.95,
                            src: '/images/fireTruck.png'
                        }))
                    }),
                    zIndex: 1
                });
                map.addLayer(layerTrucks);
            }

            function drawLine(start, end, color) {
                Route.drive({
                    origin: start,
                    destination: end
                }).then(function (res) {
                    if (res.status === 200) {
                        console.log(res.data.result);
                        var routeStyle = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: color || '#ff6600',
                                width: 5
                            })
                        });
                        var steps = res.data.result.routes[0].steps;
                        var routes = [];
                        for (var i = 0; i < steps.length; i++) {
                            var routeFeature = new ol.Feature(new ol.geom.LineString(eval('([[' + steps[i].path.replace(new RegExp(/(;)/g), '],[') + ']])')));
                            routeFeature.setStyle(routeStyle);
                            routes.push(routeFeature);
                        }

                        var layerLines = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: routes
                            })
                        });

                        map.addLayer(layerLines);
                    } else {
                        console.error(res);
                    }
                }, function (err) {
                    console.error(err);
                });
            }
        }])
})(angular);