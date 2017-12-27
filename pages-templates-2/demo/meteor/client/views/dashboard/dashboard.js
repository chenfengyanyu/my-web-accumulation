/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.dashboard.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	// Init portlets

	var bars = $('.widget-loader-bar');
	var circles = $('.widget-loader-circle');
	var circlesLg = $('.widget-loader-circle-lg');
	var circlesLgMaster = $('.widget-loader-circle-lg-master');


	bars.each(function () {
		var elem = $(this);
		elem.portlet({
			progress: 'bar',
			onRefresh: function () {
				setTimeout(function () {
					elem.portlet({
						refresh: false
					});
				}.bind(this), 2000);
			}
		});
	});


	circles.each(function () {
		var elem = $(this);
		elem.portlet({
			progress: 'circle',
			onRefresh: function () {
				setTimeout(function () {
					elem.portlet({
						refresh: false
					});
				}.bind(this), 2000);
			}
		});
	});

	circlesLg.each(function () {
		var elem = $(this);
		elem.portlet({
			progress: 'circle-lg',
			progressColor: 'white',
			overlayColor: '0,0,0',
			overlayOpacity: 0.6,
			onRefresh: function () {
				setTimeout(function () {
					elem.portlet({
						refresh: false
					});
				}.bind(this), 2000);
			}
		});
	});


	circlesLgMaster.each(function () {
		var elem = $(this);
		elem.portlet({
			progress: 'circle-lg',
			progressColor: 'master',
			overlayOpacity: 0.6,
			onRefresh: function () {
				setTimeout(function () {
					elem.portlet({
						refresh: false
					});
				}.bind(this), 2000);
			}
		});
	});

});

/** Template Helpers */
 /*
Template.dashboard.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.dashboard.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.dashboard.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.dashboard.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 