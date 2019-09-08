/**
 * Created by dinos on 11/07/15.
 */

/** Rendered Initialisation */
Template.portlets.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	/* ============================================================
	 * Portlets
	 * Create portlets using Pages Portlets plugin. Use data attribute
	 * data-pages="portlet" to auto-initialize a basic portlet without
	 * the refresh option. Please refer to docs for more
	 * For DEMO purposes only. Extract what you need.
	 * ============================================================ */


	tpl.$('#portlet-basic').portlet({
		onRefresh: function () {
			// Timeout to simulate AJAX response delay
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#portlet-basic').portlet({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#portlet-advance').portlet({
		onRefresh: function () {
			setTimeout(function () {
				// Throw any error you encounter while refreshing
				tpl.$('#portlet-advance').portlet({
					error: "Something went terribly wrong. Just keep calm and carry on!"
				});
			}, 2000);
		}
	});


	tpl.$('#portlet-linear').portlet({
		progress: 'bar',
		onRefresh: function () {
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#portlet-linear').portlet({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#portlet-circular').portlet({
		progress: 'circle',
		onRefresh: function () {
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#portlet-circular').portlet({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#portlet-circular-minimal').portlet({
		progress: 'circle-lg',
		overlayOpacity: 0.6,
		onRefresh: function () {
			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#portlet-circular-minimal').portlet({
					refresh: false
				});
			}, 2000);
		}
	});


	tpl.$('#portlet-error').portlet({
		onRefresh: function () {
			setTimeout(function () {
				tpl.$('#portlet-error').portlet({
					error: "Something went terribly wrong"
				});
			}, 2000);
		}
	});


	tpl.$('#portlet-linear-color').portlet({
		progress: 'bar',
		progressColor: 'success',
		onRefresh: function () {

			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#portlet-linear-color').portlet({
					refresh: false
				});
			}, 2000);
		}
	});

	tpl.$('#portlet-circular-color').portlet({
		progress: 'circle',
		progressColor: 'success',
		onRefresh: function () {

			setTimeout(function () {
				// Hides progress indicator
				tpl.$('#portlet-circular-color').portlet({
					refresh: false
				});
			}, 2000);
		}
	});

	// Draggable portlets are rendered using jQuery Sortable plugin
	if (!jQuery().sortable) {
		return;
	}

	tpl.$(".sortable .row .col-md-6").sortable({
		connectWith: ".sortable .row .col-md-6",
		handle: ".panel-heading",
		cancel: ".portlet-close",
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
 Template.portlets.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template.portlets.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template.portlets.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template.portlets.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */
 