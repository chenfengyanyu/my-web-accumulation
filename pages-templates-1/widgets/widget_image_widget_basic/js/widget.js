/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/

(function() {
    d3.json('http://revox.io/json/charts.json', function(data) {
        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .interpolate("basis")
                .x(function(d) {
                    return d[0]
                })
                .y(function(d) {
                    return d[1] / 100
                })
                .color([
                    $.Pages.getColor('success')
                ])
                .useInteractiveGuideline(true)

            .margin({
                    top: 150,
                    right: -10,
                    bottom: -10,
                    left: -10
                })
                .showXAxis(false)
                .showYAxis(false)
                .showLegend(false);


            d3.select('.widget-2-chart svg')
                .datum(data.nvd3.interpolated)
                .transition().duration(500)
                .call(chart);


            nv.utils.windowResize(chart.update);

            $('.widget-2-chart').data('chart', chart);

            return chart;
        }, function() {

        });
    });
})();