/**
 * Created by dinos on 09/07/15.
 */

/** Rendered Initialisation */
Template.widget_plainLiveWidget.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	this.$(".metro").liveTile();
});

/** Template Helpers */
 /*
Template.widget_plainLiveWidget.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.widget_plainLiveWidget.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.widget_plainLiveWidget.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.widget_plainLiveWidget.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 