/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
var json = [
      { 
        "label": "Shares",
        "value" : 60
      } , 
      { 
        "label": "Likes",
        "value" : 20
      } , 
      { 
        "label": "Comments",
        "value" : 20
      }
    ];

nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)
      .color([
		    $.Pages.getColor('complete'),
		    $.Pages.getColor('menu'),
		    $.Pages.getColor('primary')
		])
      .tooltipContent(function(key, y, e, graph) { return '<div><p class="key font-montserrat hint-text">'+key+'</p><p class="value semi-bold">'+y+'</p></div>' });

    d3.select("#nvd3-pie svg")
        .datum(json)
        .transition().duration(350)
        .call(chart);

    d3.select(".nv-legendWrap")
  		.attr("transform", "translate(-30,330)");

  return chart;
});