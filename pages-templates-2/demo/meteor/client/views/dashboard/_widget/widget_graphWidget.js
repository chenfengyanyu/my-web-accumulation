/**
 * Created by dinos on 09/07/15.
 */

/** Rendered Initialisation */
Template.widget_graphWidget.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()

	//NVD3 Charts
	d3.json('http://revox.io/json/charts.json', function (data) {

		// line chart
		(function () {
			nv.addGraph(function () {
				var chart = nv.models.lineChart()
					.x(function (d) {
						return d[0]
					})
					.y(function (d) {
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
					.tickFormat(function (d) {
						return d3.time.format('%a')(new Date(d))
					});

				chart.yAxis.tickFormat(d3.format('d'));

				d3.select('.nvd3-line svg')
					.datum(data.nvd3.line)
					.transition().duration(500)
					.call(chart);

				nv.utils.windowResize(chart.update);

				tpl.$('.nvd3-line').data('chart', chart);

				return chart;
			});
		})();
	});
});

/** Template Helpers */
 /*
Template.widget_graphWidget.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_graphWidget.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_graphWidget.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_graphWidget.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 