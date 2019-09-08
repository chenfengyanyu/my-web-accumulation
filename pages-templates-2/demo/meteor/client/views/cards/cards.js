/**
 * Created by dinos on 11/07/15.
 */

/** Rendered Initialisation */
Template.cards.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	/* ============================================================
	 * cards
	 * Create cards using Pages cards plugin. Use data attribute
	 * data-pages="card" to auto-initialize a basic card without
	 * the refresh option. Please refer to docs for more
	 * For DEMO purposes only. Extract what you need.
	 * ============================================================ */


	tpl.$('#card-basic').card({
		onRefresh: function () {
			// Timeout to simulate AJAX response delay
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#card-basic').card({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#card-advance').card({
		onRefresh: function () {
			setTimeout(function () {
				// Throw any error you encounter while refreshing
				tpl.$('#card-advance').card({
					error: "Something went terribly wrong. Just keep calm and carry on!"
				});
			}, 2000);
		}
	});


	tpl.$('#card-linear').card({
		progress: 'bar',
		onRefresh: function () {
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#card-linear').card({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#card-circular').card({
		progress: 'circle',
		onRefresh: function () {
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#card-circular').card({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#card-circular-minimal').card({
		progress: 'circle-lg',
		overlayOpacity: 0.6,
		onRefresh: function () {
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#card-circular-minimal').card({
					refresh: false
				});
			}, 2000);
		}
	});


	tpl.$('#card-error').card({
		onRefresh: function () {
			setTimeout(function () {
				tpl.$('#card-error').card({
					error: "Something went terribly wrong"
				});
			}, 2000);
		}
	});


	tpl.$('#card-linear-color').card({
		progress: 'bar',
		progressColor: 'success',
		onRefresh: function () {

			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#card-linear-color').card({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#card-circular-color').card({
		progress: 'circle',
		progressColor: 'success',
		onRefresh: function () {

			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#card-circular-color').card({
					refresh: false
				});
			}, 2000);
		}
	});

	// Draggable cards are rendered using jQuery Sortable plugin
	if (!jQuery().sortable) {
		return;
	}

	tpl.$(".sortable .row .col-md-6").sortable({
		connectWith: ".sortable .row .col-md-6",
		handle: ".panel-heading",
		cancel: ".card-close",
		placeholder: "sortable-box-placeholder round-all",

		forcePlaceholderSize: true,
		tolerance: 'pointer',
		forceHelperSize: true,
		revert: true,
		helper: 'original',
		opacity: 0.8,
		iframeFix: false
	});

});

/** Template Helpers */
/*
 Template.cards.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template.cards.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template.cards.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template.cards.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */
 