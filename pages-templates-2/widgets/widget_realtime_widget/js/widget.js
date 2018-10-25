/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
(function() {
    var container = '.widget-14-chart';

    var seriesData = [
        [],
        [],
        []
    ];
    var random = new Rickshaw.Fixtures.RandomData(50);
    for (var i = 0; i < 50; i++) {
        random.addData(seriesData);
    }
    var graph = new Rickshaw.Graph({
        element: document.querySelector(container),
        renderer: 'area',
        padding: {
            top: 0.5,
            bottom: 1
        },
        series: [{
            data: seriesData[0],
            color: $.Pages.getColor('success-light', .5),
            name: 'DB Server'
        }, {
            data: seriesData[1],
            color: $.Pages.getColor('master-light'),
            name: 'Web Server'
        }]
    });


    var y_axis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        orientation: 'right',
        tickFormat: function(y) {
            return y / 10;
        },
        element: document.querySelector('.widget-14-chart_y_axis'),
    });

    var legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: document.querySelector('.widget-14-chart-legend')

    });

    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
        graph: graph,
        legend: legend
    });


    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph
    });
    setInterval(function() {
        random.removeData(seriesData);
        random.addData(seriesData);
        graph.update();
    }, 1000);

    d3.selectAll('.widget-14-chart_y_axis .tick.major line').attr('x2', '7');
    d3.selectAll('.widget-14-chart_y_axis .tick.major text').attr('x', '12');
    $(window).resize(function() {
        graph.configure({
            width: $(container).width()
        });

        graph.render()
    });

    $(container).data('chart', graph);

})();