/* ============================================================
 * Dashboard
 * Generates widgets in the dashboard
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
// line chart
(function() {
     'use strict';
    //NVD3 Charts
    d3.json('http://revox.io/json/charts.json', function(data) {
        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .x(function(d) {
                    return d[0]
                })
                .y(function(d) {
                    return d[1]
                })
                .color([
                    $.Pages.getColor('success'),
                    $.Pages.getColor('danger'),
                    $.Pages.getColor('primary'),
                    $.Pages.getColor('complete'),

                ])
                .showLegend(false)
                .margin({
                    left: 30,
                    bottom: 35
                })
                .useInteractiveGuideline(true);

            chart.xAxis
                .tickFormat(function(d) {
                    return d3.time.format('%a')(new Date(d))
                });

            chart.yAxis.tickFormat(d3.format('d'));

            d3.select('.nvd3-line svg')
                .datum(data.nvd3.line)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);

            $('.nvd3-line').data('chart', chart);

            return chart;
        });
    });

    $(document).ready(function() {
        // Init portlets

        var bars = $('.widget-loader-bar');
        var circles = $('.widget-loader-circle');
        var circlesLg = $('.widget-loader-circle-lg');
        var circlesLgMaster = $('.widget-loader-circle-lg-master');



        bars.each(function() {
            var elem = $(this);
            elem.card({
                progress: 'bar',
                onRefresh: function() {
                    setTimeout(function() {
                        elem.card({
                            refresh: false
                        });
                    }.bind(this), 2000);
                }
            });
        });


        circles.each(function() {
            var elem = $(this);
            elem.card({
                progress: 'circle',
                onRefresh: function() {
                    setTimeout(function() {
                        elem.card({
                            refresh: false
                        });
                    }.bind(this), 2000);
                }
            });
        });

        circlesLg.each(function() {
            var elem = $(this);
            elem.card({
                progress: 'circle-lg',
                progressColor: 'white',
                overlayColor: '0,0,0',
                overlayOpacity: 0.6,
                onRefresh: function() {
                    setTimeout(function() {
                        elem.card({
                            refresh: false
                        });
                    }.bind(this), 2000);
                }
            });
        });


        circlesLgMaster.each(function() {
            var elem = $(this);
            elem.card({
                progress: 'circle-lg',
                progressColor: 'master',
                overlayOpacity: 0.6,
                onRefresh: function() {
                    setTimeout(function() {
                        elem.card({
                            refresh: false
                        });
                    }.bind(this), 2000);
                }
            });
        });

        // Widget Mapplic
        $('.widget-13-map').mapplic({
            source: 'http://revox.io/json/dashboard-map.json',
            height: 465,
            sidebar: false,
            minimap: false,
            locations: true,
            deeplinking: true,
            fullscreen: false,
            developer: false,
            maxscale: 3
        });

        // Disable scroll to zoom
        setTimeout(function() {
            location.hash = "#usa";
            $('.mapplic-layer').unbind('mousewheel DOMMouseScroll');
        }, 1000);
        
     });
})();