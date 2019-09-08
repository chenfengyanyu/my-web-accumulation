/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
(function() {
    d3.json('http://revox.io/json/charts.json', function(data) {

        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .x(function(d) {
                    return d[0]
                })
                .y(function(d) {
                    return d[1] / 100
                })
                .color([
                    $.Pages.getColor('success')
                ])
                .forceY([0, 2])
                .useInteractiveGuideline(true)

            .margin({
                    top: 60,
                    right: -10,
                    bottom: -10,
                    left: -10
                })
                .showLegend(false);


            d3.select('.widget-4-chart svg')
                .datum(data.nvd3.productRevenue)
                .transition().duration(500)
                .call(chart);


            nv.utils.windowResize(function() {

                chart.update();

            });

            $('.widget-4-chart').data('chart', chart);

            return chart;
        }, function() {

        });
    });
})();