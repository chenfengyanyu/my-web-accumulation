/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.icons.onRendered(function () {
	var tpl = this;
	// tpl.tpl.$(".fooJqueryPlugin").initialise()
	
	tpl.$(".icon-list").sieve({
		searchInput: tpl.$('#icon-filter'),
		itemSelector: ".fa-item"
	});

	tpl.$('#icon-filter').on('keyup', function() {
		if (tpl.$(this).val()) {
			tpl.$('#icon-list').removeClass('hidden');
			tpl.$('.icon-set-preview').css('opacity', '0');
			tpl.$('#icon-list').css('transform', 'translateY(-260px)');
			tpl.$("html, body").stop().animate({
				scrollTop: "250px"
			});
		} else {
			tpl.$('#icon-list').css('transform', 'translateY(0)');
			tpl.$('.icon-set-preview').css('opacity', '1');
			tpl.$('#icon-list').addClass('hidden');
			tpl.$("html, body").stop().animate({
				scrollTop: "0px"
			});
		}
	});
});

/** Template Helpers */
 /*
Template.icons.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.icons.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.icons.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.icons.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 