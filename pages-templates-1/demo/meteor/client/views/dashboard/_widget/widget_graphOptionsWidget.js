/**
 * Created by dinos on 09/07/15.
 */

/** Rendered Initialisation */
Template.widget_graphOptionsWidget.onRendered(function () {
	var tpl = this;
	$.Pages.initSelect2Plugin();
	// tpl.$(".fooJqueryPlugin").initialise()
	d3.json('http://revox.io/json/min_sales_chart.json', function (data) {
		nv.addGraph(function () {
			var chart = nv.models.lineChart()
				.x(function (d) {
					return d[0]
				})
				.y(function (d) {
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

			nv.utils.windowResize(function () {
				setTimeout(function () {
					tpl.$('.nvd3 circle.nv-point').attr("r", "4");
				}, 500);
			});

			return chart;
		}, function () {
			setTimeout(function () {
				tpl.$('.nvd3 circle.nv-point').attr("r", "4");
			}, 500);
		});
	});
});

/** Template Helpers */
 /*
Template.widget_graphOptionsWidget.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_graphOptionsWidget.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_graphOptionsWidget.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_graphOptionsWidget.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 