/**
 * Created by dinos on 08/07/15.
 */

/** Rendered Initialisation */
Template.widget_graphLiveWidget.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	// tiles
	tpl.$(".metro").liveTile();

	d3.json('http://revox.io/json/min_sales_chart.json', function (data) {

		// Widget-7
		nv.addGraph(function () {
			var chart = nv.models.lineChart()
				.x(function (d) {
					return d[0]
				})
				.y(function (d) {
					return d[1]
				})
				.color(['#fff'])
				.margin({
					top: 10,
					right: -10,
					bottom: 20,
					left: -10
				})
				.showXAxis(false)
				.showYAxis(false)
				.showLegend(false)
				.interactive(false);

			d3.select('.widget-7-chart svg')
				.datum(data.premarket)
				.call(chart);

			nv.utils.windowResize(chart.update);

			return chart;
		}, function () {
			setTimeout(function () {
				tpl.$('.widget-7-chart .nvd3 circle.nv-point:nth-child(4)').attr("r", "5");
			}, 500);
		});

	});
});

/** Template Helpers */
 /*
Template.widget_graphLiveWidget.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_graphLiveWidget.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_graphLiveWidget.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_graphLiveWidget.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 