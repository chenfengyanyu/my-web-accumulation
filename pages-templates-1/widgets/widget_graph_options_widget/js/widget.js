/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
d3.json('http://revox.io/json/min_sales_chart.json', function(data) {

    // Widget-15
    nv.addGraph(function() {
        var chart = nv.models.lineChart()
            .x(function(d) {
                return d[0]
            })
            .y(function(d) {
                return d[1]
            })
            .color(['#27cebc'])
            .useInteractiveGuideline(true)
            .margin({
                top: 10,
                right: -10,
                bottom: 10,
                left: -10
            })
            .showXAxis(false)
            .showYAxis(false)
            .showLegend(false)

        d3.select('.widget-16-chart svg')
            .datum(data.siteVisits)
            .call(chart);

        nv.utils.windowResize(chart.update);

        nv.utils.windowResize(function() {
            setTimeout(function() {
                $('.widget-16-chart .nvd3 circle.nv-point').attr("r", "4");
            }, 500);
        });

        return chart;
    }, function() {
        setTimeout(function() {
            $('.widget-16-chart .nvd3 circle.nv-point').attr("r", "4");
        }, 500);
    });
});