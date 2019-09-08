/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.modals.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	$('#btnToggleSlideUpSize').click(function() {
		var size = $('input[name=slideup_toggler]:checked').val()
		var modalElem = $('#modalSlideUp');
		if (size == "mini") {
			$('#modalSlideUpSmall').modal('show')
		} else {
			$('#modalSlideUp').modal('show')
			if (size == "default") {
				modalElem.children('.modal-dialog').removeClass('modal-lg');
			} else if (size == "full") {
				modalElem.children('.modal-dialog').addClass('modal-lg');
			}
		}
	});

	$('#btnStickUpSizeToggler').click(function() {
		var size = $('input[name=stickup_toggler]:checked').val()
		var modalElem = $('#myModal');
		if (size == "mini") {
			$('#modalStickUpSmall').modal('show')
		} else {
			$('#myModal').modal('show')
			if (size == "default") {
				modalElem.children('.modal-dialog').removeClass('modal-lg');
			} else if (size == "full") {
				modalElem.children('.modal-dialog').addClass('modal-lg');
			}
		}
	});

	// Only for fillin modals so that the backdrop action is still there
	$('#modalFillIn').on('show.bs.modal', function(e) {
		$('body').addClass('fill-in-modal');
	})
	$('#modalFillIn').on('hidden.bs.modal', function(e) {
		$('body').removeClass('fill-in-modal');
	})
});

/** Template Helpers */
 /*
Template.modals.helpers({
	// Register template helpers with arguments {{foo "John" "Doe" title="President"}}
	// foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }
	
});
*/

/** jQuery Events */

 /*
Template.modals.events({
	// Fires when 'accept' is clicked or focused, or a key is pressed
	// 'click .accept, focus .accept, keypress': function (event) { ... }
	
});
*/

/** Set-Up Subscriptions and Registrations */
 /*
Template.modals.onCreated(function () {
	var tpl = this; 
	// set up subscriptions, local reactive variables, registrations
	// tpl.subscribe("notifications");
});
*/


/** De-Registrations */

 /*
Template.modals.onDestroyed(function () {
	var tpl = this; 
	// de-registration
	
});
*/
 