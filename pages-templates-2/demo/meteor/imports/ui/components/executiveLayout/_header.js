/** Import menu bar as well */
import './_header.html';
import './_menu.js';

/** Rendered Initialisation */
Template.executiveHeader.onRendered(function () {
	$('[data-toggle="dropdown"]').dropdown();
});

/** Template Helpers */
/*
 Template.executiveHeader.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template.executiveHeader.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template.executiveHeader.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template.executiveHeader.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */