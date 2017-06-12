/**
 * Created by Donny on 17/3/22.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.directives', [])
        .directive('myChart', function() {
            return {
                restrict: 'E',
                template: '<div ng-style="userStyle"></div>',
                replace: true,
                scope: {
                    data: '=',
                    userStyle: '='
                },
                link: function(scope, element, attrs) {
                    // 基于准备好的dom，初始化echarts实例
                    var myChat = echarts.init(element[0]);

                    // 使用刚指定的配置项和数据显示图表
                    myChat.setOption(scope.data);

                    //监听DOM元素
                    scope.$watch('data', function(value) {
                        if (value.series) {
                            // console.log(value);
                            myChat.setOption(scope.data);
                        }
                    });

                    scope.$watch('userStyle', function(value) {
                        if (value) {
                            // console.log(value);
                            myChat.resize();
                        }
                    })
                }
            };
        })

    .directive('levelBar', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            template: '<svg class="lvlBar"></svg>',
            // template: '<svg class="lvlBar"> \
            //                 <path fill="rgb(239, 134, 69)" d="M245,0L267,0L267,24L256,30L245,24Z"/> \
            //                 <text x="256" y="18" fill="white" style="text-anchor: middle;font-size: 14px">3</text> \
            //             </svg>',
            replace: true,
            link: function(scope, element, attrs) {
                var level = attrs.level;
                var h = 24;
                var w = 22;
                var t = 6;
                var x0 = 76;
                var delta = 90;
                var lvlBar = d3.select(element[0]);
                var linePath = d3.line().curve(d3.curveLinearClosed);
                var colorlist = [
                    "#74ae45",
                    "#e3b649",
                    "#ef8645",
                    "#f25057"
                ];

                scope.$watch(attrs.level, function(value) {
                    level = value;
                    drawsvg();
                });

                function drawBar(barset) {
                    var updateBar = lvlBar.selectAll("path")
                        .data(barset);
                    var enterBar = updateBar.enter();
                    var exitBar = updateBar.exit();

                    updateBar.transition()
                        .duration(1000)
                        .ease(d3.easeElastic)
                        .attr("fill", function(d) {
                            return colorlist[d];
                        })
                        .attr("d", function(d) {
                            var lines = drawLines(d);
                            return linePath(lines);
                        });

                    enterBar.append("path")
                        .attr("fill", function(d) {
                            return colorlist[d];
                        })
                        .attr("d", function(d) {
                            var lines = drawLines(d);
                            return linePath(lines);
                        });

                    exitBar.remove();
                }

                function drawLines(d) {
                    return [
                        [x0 + delta * d - w / 2, 0],
                        [x0 + delta * d + w / 2, 0],
                        [x0 + delta * d + w / 2, h],
                        [x0 + delta * d, h + t],
                        [x0 + delta * d - w / 2, h]
                    ];
                }

                function drawText(textset) {
                    var updateText = lvlBar.selectAll("text")
                        .data(textset);
                    var enterText = updateText.enter();
                    var exitText = updateText.exit();

                    updateText.transition()
                        .duration(1000)
                        .ease(d3.easeElastic)
                        .attr("x", function(d) {
                            return x0 + delta * d;
                        })
                        .attr("y", function(d) {
                            return 18;
                        })
                        .attr("fill", "white")
                        .style("text-anchor", "middle")
                        .style("font-size", "14px")
                        .text(function(d) {
                            return d + 1;
                        });

                    enterText.append("text")
                        .attr("x", function(d) {
                            return x0 + delta * d;
                        })
                        .attr("y", function(d) {
                            return 18;
                        })
                        .attr("fill", "white")
                        .style("text-anchor", "middle")
                        .style("font-size", "14px")
                        .text(function(d) {
                            return d + 1;
                        });

                    exitText.remove();
                }

                function drawsvg() {
                    drawBar([level]);
                    drawText([level]);

                    $timeout(function() {
                        level = (level + 1) % 4;
                        drawsvg();
                    }, 3000);
                }
            }
        }
    }])

    .directive('barGraph', ['$timeout', '$parse', function($timeout, $parse) {
        return {
            restrict: 'E',
            template: '<svg class="area" width="325px" height="168px"> \
                        <defs> \
                            <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%"> \
                                <stop offset="0%" stop-color="rgb(227,182,73)" stop-opacity="1" /> \
                                <stop offset="100%" stop-color="rgb(242,80,87)" stop-opacity="1" /> \
                            </linearGradient> \
                        </defs> \
                        <text id="text_x" font-family="Microsoft YaHei" fill="rgb(75, 112, 140)" font-size="12px" x="200" y="165" style="text-anchor: middle"> \
                        </text> \
                        <text id="text_y" font-family="Microsoft YaHei" fill="rgb(75, 112, 140)" font-size="14px" x="10" y="12" style="text-anchor: middle"> \
                        </text> \
                        <path fill-rule="evenodd" fill="rgb(21, 61, 88)" d="M31,141 L323,141 C323.552,141 324,141.448 324,142 C324,142.552 323.552,143 323,143 L31,143 C30.448,143 30,142.552 30,142 C30,141.448 30.448,141 31,141 Z" /> \
                        <path fill-rule="evenodd" fill="rgb(21, 61, 88)" d="M323,75 L31,75 C30.448,75 30,74.776 30,74.500 C30,74.224 30.448,74 31,74 L323,74 C323.552,74 324,74.224 324,74.500 C324,74.776 323.552,75 323,75 ZM323,41 L31,41 C30.448,41 30,40.776 30,40.500 C30,40.224 30.448,40 31,40 L323,40 C323.552,40 324,40.224 324,40.500 C324,40.776 323.552,41 323,41 ZM323,6 L31,6 C30.448,6 30,5.776 30,5.500 C30,5.224 30.448,5 31,5 L323,5 C323.552,5 324,5.224 324,5.500 C324,5.776 323.552,6 323,6 ZM31,107 L323,107 C323.552,107 324,107.224 324,107.500 C324,107.776 323.552,108 323,108 L31,108 C30.448,108 30,107.776 30,107.500 C30,107.224 30.448,107 31,107 Z" /> \
                    </svg>',
            replace: true,
            link: function(scope, element, attrs) {
                var svg = d3.select(element[0]);
                var text_x = svg.selectAll("#text_x");
                var text_y = svg.selectAll("#text_y");

                var data = JSON.parse(attrs.data);
                var x0 = 68;
                var rectStep = 216 / (data.length - 1);
                var rectWidth = 30;

                scope.$watch(function() {
                    return attrs.data;
                }, function(value) {
                    data = JSON.parse(value);
                    rectStep = 216 / (data.length - 1);
                    drawsvg();
                });

                function drawBar() {
                    var updateBar = svg.selectAll("rect").data(data);
                    var enterBar = updateBar.enter();
                    var exitBar = updateBar.exit();

                    updateBar.attr("x", function(d, i) {
                            return x0 + rectStep * i - rectWidth / 2;
                        })
                        .attr("y", function(d, i) {
                            return 141;
                        })
                        .attr("width", function(d, i) {
                            return rectWidth;
                        })
                        .transition()
                        .duration(1000)
                        .ease(d3.easeCubicOut)
                        .attr("height", function(d) {
                            return 136 * d.value / 40;
                        })
                        .style("transform", function(d) {
                            return "translate(0, -" + 136 * d.value / 40 + "px)";
                        })
                        .attr("fill", "url(#PSgrad_0)");

                    enterBar.append("rect")

                    .attr("x", function(d, i) {
                            return x0 + rectStep * i - rectWidth / 2;
                        })
                        .attr("y", function(d, i) {
                            // return 136 - 136 * d.value / 40 + 6;
                            return 141;
                        })
                        .attr("width", function(d, i) {
                            return rectWidth;
                        })
                        .transition()
                        .duration(1000)
                        .ease(d3.easeCubicOut)
                        .attr("height", function(d) {
                            return 136 * d.value / 40;
                        })
                        .style("transform", function(d) {
                            return "translate(0, -" + 136 * d.value / 40 + "px)";
                        })
                        .attr("fill", "url(#PSgrad_0)");

                    exitBar.remove();
                }

                function drawText() {
                    // legend of x
                    var updateTextX = text_x.selectAll("tspan")
                        .data(data);
                    var enterTextX = updateTextX.enter();
                    var exitTextX = updateTextX.exit();

                    updateTextX.attr("x", function(d, i) {
                            return x0 + rectStep * i;
                        })
                        .text(function(d) {
                            return d.name;
                        });

                    enterTextX.append("tspan")
                        .attr("x", function(d, i) {
                            return x0 + rectStep * i;
                        })
                        .text(function(d) {
                            return d.name;
                        })

                    exitTextX.remove();

                    // legend of y
                    var updateTextY = text_y.selectAll("tspan")
                        .data(data);
                    var enterTextY = updateTextY.enter();
                    var exitTextY = updateTextY.exit();

                    updateTextY.attr("x", function(d) {
                            return 10;
                        })
                        .attr("dy", function(d, i) {
                            return i === 0 ? 0 : 34;
                        })
                        .text(function(d, i) {
                            return (data.length - i - 1) * 10;
                        });

                    enterTextY.append("tspan")
                        .attr("x", function(d) {
                            return 10;
                        })
                        .attr("dy", function(d, i) {
                            return i === 0 ? 0 : 34;
                        })
                        .text(function(d, i) {
                            return (data.length - i - 1) * 10;
                        });

                    exitTextY.remove();
                }

                function drawsvg() {
                    drawBar();
                    drawText();
                }
            }
        }
    }])

})(angular);
