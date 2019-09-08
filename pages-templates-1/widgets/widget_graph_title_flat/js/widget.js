/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
d3.json('http://revox.io/json/min_sales_chart.json', function(data) {
    nv.addGraph(function() {
        var chart = nv.models.lineChart()
            .x(function(d) {
                return d[0]
            })
            .y(function(d) {
                return d[1]
            })
            .color(['#000'])
            .margin({
                top: 10,
                right: -10,
                bottom: -13,
                left: -10
            })
            .showXAxis(false)
            .showYAxis(false)
            .showLegend(false)
            .interactive(false);

        d3.select('.widget-8-chart svg')
            .datum(data.siteVisits)
            .call(chart);



        nv.utils.windowResize(chart.update);

        nv.utils.windowResize(function() {
            setTimeout(function() {
                $('.widget-8-chart .nvd3 circle.nv-point').attr("r", "3").css({
                    'stroke-width': '2px',
                    ' stroke-opacity': 0.4
                });
            }, 500);
        });

        return chart;
    }, function() {
        setTimeout(function() {
            $('.widget-8-chart .nvd3 circle.nv-point').attr("r", "3").css({
                'stroke-width': '2px',
                ' stroke-opacity': 0.4
            });
        }, 500);
    });
});