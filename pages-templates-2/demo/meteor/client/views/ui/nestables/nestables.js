/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.nestables.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()

	/* ============================================================
	* Nestables
	* Creates draggable, nested list structures using jQuery Nestable
	* plugin
	* For DEMO purposes only. Extract what you need.
	* ============================================================ */

	var updateOutput = function(e) {
		var list = e.length ? e : $(e.target),
			output = list.data('output');
		if (window.JSON) {
			output.html(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
		} else {
			output.html('JSON browser support required for this demo.');
		}
	};
	$('#basic_example').nestable();
	$('#drag_handler_example').nestable();
	// activate Nestable for list 1
	$('#nestable').nestable({
		group: 1
	})
		.on('change', updateOutput);

	// activate Nestable for list 2
	$('#nestable2').nestable({
		group: 1
	})
		.on('change', updateOutput);

	// output initial serialised data
	updateOutput($('#nestable').data('output', $('#nestable-output')));
	updateOutput($('#nestable2').data('output', $('#nestable2-output')));

	$('#nestable-menu').on('click', function(e) {
		var target = $(e.target),
			action = target.data('action');
		if (action === 'expand-all') {
			$('.dd').nestable('expandAll');
		}
		if (action === 'collapse-all') {
			$('.dd').nestable('collapseAll');
		}
	});

});

/** Template Helpers */
 /*
Template.nestables.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.nestables.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.nestables.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.nestables.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 