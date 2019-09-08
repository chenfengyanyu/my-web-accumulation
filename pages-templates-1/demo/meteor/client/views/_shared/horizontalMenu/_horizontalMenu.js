/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.horizontalMenu.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	$.Pages.initHorizontalMenu();
});


/** Template Helpers */
/*
 Template._sideBar.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template._sideBar.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template._sideBar.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template._sideBar.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */
 