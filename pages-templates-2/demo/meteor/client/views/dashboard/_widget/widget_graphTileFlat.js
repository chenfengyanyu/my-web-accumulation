/**
 * Created by dinos on 09/07/15.
 */

/** Rendered Initialisation */
Template.widget_graphTileFlat.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	d3.json('http://revox.io/json/min_sales_chart.json', function (data) {

		// Widget-8
		nv.addGraph(function () {
			var chart = nv.models.lineChart()
				.x(function (d) {
					return d[0]
				})
				.y(function (d) {
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

			nv.utils.windowResize(function () {
				setTimeout(function () {
					tpl.$('.widget-8-chart .nvd3 circle.nv-point').attr("r", "3").css({
						'stroke-width': '2px',
						' stroke-opacity': 0.4
					});
				}, 500);
			});

			return chart;
		}, function () {
			setTimeout(function () {
				tpl.$('.widget-8-chart .nvd3 circle.nv-point').attr("r", "3").css({
					'stroke-width': '2px',
					' stroke-opacity': 0.4
				});
			}, 500);
		});
	});
});

/** Template Helpers */
 /*
Template.widget_graphTileFlat.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_graphTileFlat.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_graphTileFlat.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_graphTileFlat.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 