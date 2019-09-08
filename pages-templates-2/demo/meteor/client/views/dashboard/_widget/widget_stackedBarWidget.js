/**
 * Created by dinos on 09/07/15.
 */

/** Rendered Initialisation */
Template.widget_stackedBarWidget.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	//Get from JSON data and build

	//NVD3 Charts
	d3.json('http://revox.io/json/charts.json', function (data) {

		// Widget 15

		var container = '.rickshaw-chart';

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
			height: 200,
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
			formatter: function (series, x, y) {
				var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
				var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
				var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date;
				return content;
			}
		});

		graph.render();

		$(window).resize(function () {
			graph.configure({
				width: $(container).width(),
				height: 200
			});

			graph.render()
		});

		$(container).data('chart', graph);

	});
});

/** Template Helpers */
/*
 Template.widget_stackedBarWidget.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template.widget_stackedBarWidget.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template.widget_stackedBarWidget.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template.widget_stackedBarWidget.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */
 