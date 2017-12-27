/**
 * Created by dinos on 08/07/15.
 */

/** Rendered Initialisation */
Template.widget_graphTile.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()

//NVD3 Charts
	d3.json('http://revox.io/json/charts.json', function (data) {
		// line chart2
		(function () {
			nv.addGraph(function () {
				var chart = nv.models.lineChart()
					.x(function (d) {
						return d[0]
					})
					.y(function (d) {
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


				nv.utils.windowResize(function () {

					chart.update();

				});

				tpl.$('.line-chart').data('chart', chart);

				return chart;
			}, function () {

			});
		})();
	});

});

/** Template Helpers */
 /*
  Template.widget_graphTile.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
  Template.widget_graphTile.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
  Template.widget_graphTile.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
  Template.widget_graphTile.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 