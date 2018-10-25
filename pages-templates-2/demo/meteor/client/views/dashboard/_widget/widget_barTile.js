/**
 * Created by dinos on 09/07/15.
 */

/** Rendered Initialisation */
Template.widget_barTile.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	//NVD3 Charts
	d3.json('http://revox.io/json/charts.json', function (data) {

		// widget 5
		(function () {
			var container = '.widget-5-chart';

			var seriesData = [
				[],
				[]
			];
			var random = new Rickshaw.Fixtures.RandomData(7);
			for (var i = 0; i < 7; i++) {
				random.addData(seriesData);
			}

			var graph = new Rickshaw.Graph({
				element: document.querySelector(container),
				renderer: 'bar',
				series: [{
					data: [{
						x: 0,
						y: 10
					}, {
						x: 1,
						y: 8
					}, {
						x: 2,
						y: 5
					}, {
						x: 3,
						y: 9
					}, {
						x: 4,
						y: 5
					}, {
						x: 5,
						y: 8
					}, {
						x: 6,
						y: 10
					}],
					color: $.Pages.getColor('danger')
				}, {
					data: [{
						x: 0,
						y: 0
					}, {
						x: 1,
						y: 2
					}, {
						x: 2,
						y: 5
					}, {
						x: 3,
						y: 1
					}, {
						x: 4,
						y: 5
					}, {
						x: 5,
						y: 2
					}, {
						x: 6,
						y: 0
					}],
					color: $.Pages.getColor('master-light')
				}]

			});


			var MonthBarsRenderer = Rickshaw.Class.create(Rickshaw.Graph.Renderer.Bar, {
				barWidth: function (series) {

					return 7;
				}
			});


			graph.setRenderer(MonthBarsRenderer);


			graph.render();


			$(window).resize(function () {
				graph.configure({
					width: $(container).width(),
					height: $(container).height()
				});

				graph.render()
			});

			$(container).data('chart', graph);

		})();

	});
});

/** Template Helpers */
 /*
Template.widget_barTile.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_barTile.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_barTile.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_barTile.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 