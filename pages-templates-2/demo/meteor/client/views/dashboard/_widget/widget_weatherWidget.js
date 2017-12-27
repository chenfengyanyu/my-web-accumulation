/**
 * Created by dinos on 08/07/15.
 */

/** Rendered Initialisation */
Template.widget_weatherWidget.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	// Widget 17
	// Initialize Skycons
	var icons = new Skycons(),
		list = [
			"clear-day", "clear-night", "partly-cloudy-day",
			"partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
			"fog"
		],
		i;
	for (i = list.length; i--;) {
		var weatherType = list[i],
			elements = document.getElementsByClassName(weatherType);
		for (var e = elements.length; e--;) {
			icons.set(elements[e], weatherType);
		}
	}

	icons.play();


});

/** Template Helpers */
 /*
Template.widget_weatherWidget.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_weatherWidget.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_weatherWidget.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_weatherWidget.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 