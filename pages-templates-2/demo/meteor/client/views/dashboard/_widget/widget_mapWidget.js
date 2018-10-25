/**
 * Created by dinos on 08/07/15.
 */

/** Rendered Initialisation */
Template.widget_mapWidget.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()


	// TODO Inside JSON is file source defined
	// Widget 13
	tpl.$('.map').mapplic({
		source: '/json/dashboard-map.json',
		height: 465,
		sidebar: false,
		minimap: false,
		locations: true,
		deeplinking: true,
		fullscreen: false,
		developer: false,
		maxscale: 3
	});

	// Disable scroll to zoom
	setTimeout(function() {
		location.hash = "#usa";
		tpl.$('.mapplic-layer').unbind('mousewheel DOMMouseScroll');
	}, 1000);

	tpl.$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
		var target = tpl.$(e.target).text().trim();
		var hash;
		if (target == 'fb') {
			hash = '#usa';
		} else if (target == 'sa') {
			hash = '#af';
		} else if (target == 'js') {
			hash = '#ru';
		}
		window.location.hash = hash;
	});
});

/** Template Helpers */
 /*
Template.widget_mapWidget.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_mapWidget.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_mapWidget.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_mapWidget.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 