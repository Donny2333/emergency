/**
 * Created by Donny on 17/3/22.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.controllers', [])
        .controller('AppController', ['$scope', '$rootScope', '$http', 'Route', 'FullFeatures', '$timeout', function($scope, $rootScope, $http, Route, FullFeatures, $timeout) {
            $scope.toggleFullScreen = function() {
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
            var layerLHK = new ol.layer.Image();

            var map = new ol.Map({
                target: 'map',
                layers: [
                    layerLHK
                ],
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
            drawPath(truckPos1, firePos, null, '/images/firetruck.png');
            drawPath(truckPos2, firePos, '#aeea92', '/images/ambulance.png');


            // Set canvas drawing surface
            var space = document.createElement("canvas");
            space.backgroundColor = "red";
            var surface = space.getContext("2d");

            // Set Particles
            var particles = [];
            var particle_count = 150;
            for (var i = 0; i < particle_count; i++) {
                particles.push(new particle());
            }
            var time = 0;
            // Set wrapper and canvas items size
            var canvasWidth = 80;
            var canvasHeight = 160;

            // shim layer with setTimeout fallback from Paul Irish
            window.requestAnimFrame = (function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 6000 / 60);
                    };
            })();

            function particle() {
                this.speed = { x: -1 + Math.random() * 2, y: -5 + Math.random() * 5 };
                canvasWidth = 80;
                canvasHeight = 160;
                this.location = { x: canvasWidth / 2, y: (canvasHeight / 2) + 35 };
                this.radius = .5 + Math.random() * 1;

                this.life = 10 + Math.random() * 10;
                this.death = this.life;

                this.r = 255;
                this.g = Math.round(Math.random() * 155);
                this.b = 0;
            }

            function ParticleAnimation() {
                surface.globalCompositeOperation = "source-over";
                surface.fillStyle = "rgba(0, 0, 0, 1)";
                surface.fillRect(0, 0, canvasWidth, canvasHeight);
                surface.globalCompositeOperation = "lighter";

                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];

                    surface.beginPath();

                    p.opacity = Math.round(p.death / p.life * 100) / 100
                    var gradient = surface.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
                    gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                    gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                    gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
                    surface.fillStyle = gradient;
                    surface.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
                    surface.fill();
                    p.death--;
                    p.radius++;
                    p.location.x += (p.speed.x);
                    p.location.y += (p.speed.y);

                    //regenerate particles
                    if (p.death < 0 || p.radius < 0) {
                        //a brand new particle replacing the dead one
                        particles[i] = new particle();
                    }
                }

                requestAnimFrame(ParticleAnimation);
            }


            ParticleAnimation();


            drawPoints([firePos], new ol.style.Style({
                image: new ol.style.Icon({
                    src: '/images/fire.png',
                    // img: space,
                    // imgSize: [canvasWidth, canvasHeight]
                })
            }));
            // drawPoints([truckPos1], new ol.style.Style({
            //     image: new ol.style.Icon({
            //         src: '/images/firetruck.png'
            //     })
            // }));
            // drawPoints([truckPos2], new ol.style.Style({
            //     image: new ol.style.Icon({
            //         src: '/images/ambulance.png'
            //     })
            // }));

            FullFeatures.query({
                type: '救援队伍',
                keyword: '消防队',
                point: firePos.join(','),
                distance: 5000
            }).then(function(res) {
                var pts = [];
                var results = res.data.result.Result[0].Result;
                results.map(function(result) {
                    var shape = result.Shape;
                    var pt = [
                        parseFloat(shape.slice(0, shape.indexOf(','))),
                        parseFloat(shape.slice(shape.indexOf(',') + 1, shape.length))
                    ];
                    pts.push(pt);
                });
                // console.log(pts);
                drawPoints(pts, new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/images/firefighter.png'
                    })
                }));

            }, function(err) {
                console.log(err);
            });

            FullFeatures.query({
                type: '医疗机构',
                point: firePos.join(','),
                distance: 5000
            }).then(function(res) {
                var pts = [];
                var results = res.data.result.Result[0].Result;
                results.map(function(result) {
                    var shape = result.Shape;
                    var pt = [
                        parseFloat(shape.slice(0, shape.indexOf(','))),
                        parseFloat(shape.slice(shape.indexOf(',') + 1, shape.length))
                    ];
                    pts.push(pt);
                });
                // console.log(pts);
                drawPoints(pts, new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/images/hospital.png'
                    })
                }));
            }, function(err) {
                console.log(err);
            });

            FullFeatures.query({
                type: '危险源',
                pageSize: 80,
                point: firePos.join(','),
                distance: 5000
            }).then(function(res) {
                var pts = [];
                var results = res.data.result.Result[0].Result;
                results.map(function(result) {
                    var shape = result.Shape;
                    var pt = [
                        parseFloat(shape.slice(0, shape.indexOf(','))),
                        parseFloat(shape.slice(shape.indexOf(',') + 1, shape.length))
                    ];
                    pts.push(pt);
                });
                console.log(pts);
                drawPoints(pts, new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/images/facility.png'
                    })
                }));

            }, function(err) {
                console.log(err);
            });

            FullFeatures.query({
                type: '消防栓',
                pageSize: 50,
                point: firePos.join(','),
                distance: 5000
            }).then(function(res) {
                var pts = [];
                var results = res.data.result.Result[0].Result;
                results.map(function(result) {
                    var shape = result.Shape;
                    var pt = [
                        parseFloat(shape.slice(0, shape.indexOf(','))),
                        parseFloat(shape.slice(shape.indexOf(',') + 1, shape.length))
                    ];
                    pts.push(pt);
                });
                // console.log(pts);
                drawPoints(pts, new ol.style.Style({
                    image: new ol.style.Icon({
                        src: '/images/fireplug.png'
                    })
                }));

            }, function(err) {
                console.log(err);
            });

            // var ws = new WebSocket('ws://192.168.99.107:12345');
            //
            // ws.onopen = function (evt) {
            //     console.log('Connection open ...');
            //     ws.send('Hello WebSockets!');
            // };
            //
            // ws.onmessage = function (evt) {
            //     console.log('Received Message: ' + evt.data);
            //     // ws.close();
            // };
            //
            // // ws.onclose = function (evt) {
            // //     console.log('Connection closed.');
            // // };


            function initMap(url, params) {
                map.getLayers().item(0).setSource(new ol.source.ImageArcGISRest({
                    url: url,
                    params: params || {}
                }));
            }

            function startAnimation() {
                if (animating) {
                    stopAnimation(false);
                } else {
                    animating = true;
                    now = new Date().getTime();
                    speed = speedInput.value;
                    startButton.textContent = 'Cancel Animation';
                    // hide geoMarker
                    geoMarker.setStyle(null);
                    // just in case you pan somewhere else
                    map.getView().setCenter(center);
                    map.on('postcompose', moveFeature);
                    map.render();
                }
            }

            function drawPoints(pts, style) {
                var points = [];
                points.push(new ol.Feature(new ol.geom.MultiPoint(pts)));

                var layerPoints = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: points
                    }),
                    style: style,
                    zIndex: 10
                });
                map.addLayer(layerPoints);
            }

            function drawPath(start, end, color, img) {
                Route.drive({
                    origin: start,
                    destination: end
                }).then(function(res) {
                    if (res.status === 200) {
                        // console.log(res.data.result);
                        var layerLines;
                        var layerTrucks;
                        var routeStyle = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: color || '#ff6600',
                                width: 5
                            })
                        });
                        var truckStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: img || '/images/firetruck.png'
                            })
                        })
                        var steps = res.data.result.routes[0].steps;
                        var routes = [];
                        var lines = [];
                        for (var i = 0; i < steps.length; i++) {
                            // var routeFeature = new ol.Feature(new ol.geom.LineString(eval('([[' + steps[i].path.replace(new RegExp(/(;)/g), '],[') + ']])')));
                            // routeFeature.setStyle(routeStyle);
                            // routes.push(routeFeature);
                            lines.push(eval('([[' + steps[i].path.replace(new RegExp(/(;)/g), '],[') + ']])'));
                        }


                        var list = [];
                        lines.map(function(value) {
                            list = _.concat(list, value);
                        });
                        draw(list, routeStyle, truckStyle, 20, 1000);
                        // drawLines(list, routeStyle);

                        function draw(list, style, truckStyle, steps, time) {
                            drawLines(list.slice(1), routeStyle);
                            drawAnimatedLine(list[0], list[1], style, truckStyle, steps, time, function() {
                                list.shift();
                                if (list.length >= 2) {
                                    // drawTrucks([list[0]], truckStyle);
                                    draw(list, style, truckStyle, steps, time);
                                }
                            });
                        }

                        function drawLines(lines, style) {
                            if (layerLines) {
                                map.removeLayer(layerLines);
                            }
                            layerLines = new ol.layer.Vector({
                                source: new ol.source.Vector({
                                    features: [
                                        new ol.Feature({
                                            geometry: new ol.geom.LineString(lines)
                                        })
                                    ]
                                }),
                                style: style
                            })
                            map.addLayer(layerLines);
                        }

                        function drawAnimatedLine(startPt, endPt, style, truckStyle, steps, time, fn) {
                            var directionX = (endPt[0] - startPt[0]) / steps;
                            var directionY = (endPt[1] - startPt[1]) / steps;

                            var i = 0;
                            var prevLayer;
                            var ivlDraw = setInterval(function() {
                                if (i > steps) {
                                    clearInterval(ivlDraw);
                                    if (prevLayer) map.removeLayer(prevLayer);
                                    if (fn) fn();
                                    return;
                                }
                                // var newEndPt = [startPt[0] + i * directionX, startPt[1] + i * directionY];
                                var newStartPt = [startPt[0] + i * directionX, startPt[1] + i * directionY];

                                // var line = new ol.geom.LineString([startPt, newEndPt]);
                                var line = new ol.geom.LineString([newStartPt, endPt]);

                                var vec = new ol.layer.Vector({
                                    source: new ol.source.Vector({
                                        features: [new ol.Feature(line)]
                                    }),
                                    style: style,
                                    zIndex: 10
                                });

                                map.addLayer(vec);
                                if (prevLayer) map.removeLayer(prevLayer);
                                drawTrucks([newStartPt], truckStyle);
                                prevLayer = vec;
                                i++;
                            }, time / steps);

                            function drawTrucks(pos, style) {
                                if (layerTrucks) {
                                    var source = layerTrucks.getSource();
                                    source.getFeatures()[0].getGeometry().setCoordinates(pos[0]);
                                    // map.removeLayer(layerTrucks);
                                } else {
                                    var trucks = [];
                                    pos.map(function(point) {
                                        trucks.push(new ol.Feature(new ol.geom.Point(point)));
                                    });
                                    layerTrucks = new ol.layer.Vector({
                                        source: new ol.source.Vector({
                                            features: trucks
                                        }),
                                        style: style,
                                        updateWhileAnimating: true,
                                        zIndex: 1
                                    });
                                    map.addLayer(layerTrucks);
                                }
                            }
                        }

                    } else {
                        console.error(res);
                    }
                }, function(err) {
                    console.error(err);
                });
            }

            function drawLine(startPt, endPt, style) {
                var line = new ol.geom.LineString([startPt, endPt]);

                var layerLines = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [new ol.Feature(line)]
                    }),
                    style: style
                });

                map.addLayer(layerLines);
            }
        }])
})(angular);
