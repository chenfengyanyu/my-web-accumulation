/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
(function() {
    var container = '.widget-15-chart2';

    var seriesData = [
        [],
        []
    ];
    var random = new Rickshaw.Fixtures.RandomData(40);
    for (var i = 0; i < 40; i++) {
        random.addData(seriesData);
    }

    var graph = new Rickshaw.Graph({
        renderer: 'bar',
        element: document.querySelector(container),
        padding: {
            top: 0.5
        },
        series: [{
            data: seriesData[0],
            color: $.Pages.getColor('complete-light'),
            name: "New users"
        }, {
            data: seriesData[1],
            color: $.Pages.getColor('master-lighter'),
            name: "Returning users"

        }]

    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph,
        formatter: function(series, x, y) {
            var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
            var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
            var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date;
            return content;
        }
    });

    graph.render();

    $(window).resize(function() {
        graph.configure({
            width: $(container).width(),
            height: 200
        });

        graph.render()
    });

    $(container).data('chart', graph);

})();