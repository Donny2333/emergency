/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.directives', [])
        .directive('myChart', function () {
            return {
                restrict: 'E',
                template: '<div ng-style="userStyle"></div>',
                replace: true,
                scope: {
                    data: '=',
                    userStyle: '='
                },
                link: function (scope, element, attrs) {
                    // 基于准备好的dom，初始化echarts实例
                    var myChat = echarts.init(element[0]);

                    // 使用刚指定的配置项和数据显示图表
                    myChat.setOption(scope.data);

                    //监听DOM元素
                    scope.$watch('data', function (value) {
                        if (value.series) {
                            // console.log(value);
                            myChat.setOption(scope.data);
                        }
                    });

                    scope.$watch('userStyle', function (value) {
                        if (value) {
                            // console.log(value);
                            myChat.resize();
                        }
                    })
                }
            };
        })

        .directive('levelBar', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                template: '<svg class="lvlBar"></svg>',
                // template: '<svg class="lvlBar"> \
                //                 <path fill="rgb(239, 134, 69)" d="M245,0L267,0L267,24L256,30L245,24Z"/> \
                //                 <text x="256" y="18" fill="white" style="text-anchor: middle;font-size: 14px">3</text> \
                //             </svg>',
                replace: true,
                link: function (scope, element, attrs) {
                    var level = 2;
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

                    drawsvg();

                    function drawBar(barset) {
                        var updateBar = lvlBar.selectAll("path")
                            .data(barset);
                        var enterBar = updateBar.enter();
                        var exitBar = updateBar.exit();

                        updateBar.transition()
                            .duration(1000)
                            .ease(d3.easeElastic)
                            .attr("fill", function (d) {
                                return colorlist[d];
                            })
                            .attr("d", function (d) {
                                var lines = drawLines(d);
                                return linePath(lines);
                            });

                        enterBar.append("path")
                            .attr("fill", function (d) {
                                return colorlist[d];
                            })
                            .attr("d", function (d) {
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
                            .attr("x", function (d) {
                                return x0 + delta * d;
                            })
                            .attr("y", function (d) {
                                return 18;
                            })
                            .attr("fill", "white")
                            .style("text-anchor", "middle")
                            .style("font-size", "14px")
                            .text(function (d) {
                                return d + 1;
                            });

                        enterText.append("text")
                            .attr("x", function (d) {
                                return x0 + delta * d;
                            })
                            .attr("y", function (d) {
                                return 18;
                            })
                            .attr("fill", "white")
                            .style("text-anchor", "middle")
                            .style("font-size", "14px")
                            .text(function (d) {
                                return d + 1;
                            });

                        exitText.remove();
                    }

                    function drawsvg() {
                        drawBar([level]);
                        drawText([level]);

                        $timeout(function () {
                            level = (level + 1) % 4;
                            drawsvg();
                        }, 1500);
                    }
                }
            }
        }])

})(angular);