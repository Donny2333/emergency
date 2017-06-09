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

    .directive('barGraph', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            template: '<svg class="area" width="324px" height="166px"> \
                        <defs> \
                            <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%"> \
                                <stop offset="0%" stop-color="rgb(227,182,73)" stop-opacity="1" /> \
                                <stop offset="100%" stop-color="rgb(242,80,87)" stop-opacity="1" /> \
                            </linearGradient> \
                        </defs> \
                        <text id="text_x" font-family="Microsoft YaHei" fill="rgb(75, 112, 140)" font-size="12px" x="200" y="165" style="text-anchor: middle"> \
                            <tspan x="70">燃料仓库</tspan> \
                            <tspan x="122">油库</tspan> \
                            <tspan x="174">燃气设施</tspan> \
                            <tspan x="226">化工厂</tspan> \
                            <tspan x="278">烟花仓库</tspan> \
                        </text> \
                        <text id="text_y" font-family="Microsoft YaHei" fill="rgb(75, 112, 140)" font-size="14px" x="10" y="12" style="text-anchor: middle"> \
                            <tspan x="10" dy="0">40</tspan> \
                            <tspan x="10" dy="34">30</tspan> \
                            <tspan x="10" dy="34">20</tspan> \
                            <tspan x="10" dy="34">10</tspan> \
                            <tspan x="12" dy="34">0</tspan> \
                        </text> \
                        <path fill-rule="evenodd" fill="rgb(21, 61, 88)" d="M31.000,141.000 L323.000,141.000 C323.552,141.000 324.000,141.448 324.000,142.000 C324.000,142.552 323.552,143.000 323.000,143.000 L31.000,143.000 C30.448,143.000 30.000,142.552 30.000,142.000 C30.000,141.448 30.448,141.000 31.000,141.000 Z" /> \
                        <path fill-rule="evenodd" fill="rgb(21, 61, 88)" d="M323.000,75.000 L31.000,75.000 C30.448,75.000 30.000,74.776 30.000,74.500 C30.000,74.224 30.448,74.000 31.000,74.000 L323.000,74.000 C323.552,74.000 324.000,74.224 324.000,74.500 C324.000,74.776 323.552,75.000 323.000,75.000 ZM323.000,41.000 L31.000,41.000 C30.448,41.000 30.000,40.776 30.000,40.500 C30.000,40.224 30.448,40.000 31.000,40.000 L323.000,40.000 C323.552,40.000 324.000,40.224 324.000,40.500 C324.000,40.776 323.552,41.000 323.000,41.000 ZM323.000,6.000 L31.000,6.000 C30.448,6.000 30.000,5.776 30.000,5.500 C30.000,5.224 30.448,5.000 31.000,5.000 L323.000,5.000 C323.552,5.000 324.000,5.224 324.000,5.500 C324.000,5.776 323.552,6.000 323.000,6.000 ZM31.000,107.000 L323.000,107.000 C323.552,107.000 324.000,107.224 324.000,107.500 C324.000,107.776 323.552,108.000 323.000,108.000 L31.000,108.000 C30.448,108.000 30.000,107.776 30.000,107.500 C30.000,107.224 30.448,107.000 31.000,107.000 Z" /> \
                        <path fill-rule="evenodd" fill="rgb(240, 87, 61)" d="M269.000,141.000 L269.000,67.000 L297.000,67.000 L297.000,141.000 L269.000,141.000 ZM215.000,26.000 L243.000,26.000 L243.000,141.000 L215.000,141.000 L215.000,26.000 ZM161.000,55.000 L189.000,55.000 L189.000,141.000 L161.000,141.000 L161.000,55.000 ZM107.000,87.000 L135.000,87.000 L135.000,141.000 L107.000,141.000 L107.000,87.000 ZM53.000,10.000 L81.000,10.000 L81.000,141.000 L53.000,141.000 L53.000,10.000 Z" /> \
                        <path fill="url(#PSgrad_0)" d="M269.000,141.000 L269.000,67.000 L297.000,67.000 L297.000,141.000 L269.000,141.000 ZM215.000,26.000 L243.000,26.000 L243.000,141.000 L215.000,141.000 L215.000,26.000 ZM161.000,55.000 L189.000,55.000 L189.000,141.000 L161.000,141.000 L161.000,55.000 ZM107.000,87.000 L135.000,87.000 L135.000,141.000 L107.000,141.000 L107.000,87.000 ZM53.000,10.000 L81.000,10.000 L81.000,141.000 L53.000,141.000 L53.000,10.000 Z" /> \
            </svg>',
            replace: true,
            link: function(scope, element, attrs) {
                var dataset = ['燃料仓库', '油库', '燃气设施', '化工厂', '烟花仓库'];
                var svg = d3.select(element[0]);
                var tspan = svg.selectAll("tspan");

                function drawText() {
                    var text_x = d3.select($('text_x')[0]);
                    var text_y = d3.select($('text_y')[0]);
                    var updateText = svg.selectAll("text")
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
            }
        }
    }])

})(angular);
