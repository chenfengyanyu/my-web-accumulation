/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.sliders.onRendered(function () {
	var tpl = this;
	// tpl.tpl.$(".fooJqueryPlugin").initialise()

	/* ============================================================
	 * Sliders
	 * Sliders using Ion Slider and noUiSlider jQuery Plugins
	 * For DEMO purposes only. Extract what you need.
	 * ============================================================ */
	tpl.$(".ion_slider").ionRangeSlider({
		min: 0,
		max: 5000,
		type: 'double',
		prefix: "$",
		maxPostfix: "+",
		prettify_enabled: false,
		grid: true
	});
	tpl.$("#example_1").ionRangeSlider({
		min: 0,
		max: 5000,
		type: 'double',
		prefix: "$",
		maxPostfix: "+",
		prettify_enabled: false,
		grid: true
	});

	tpl.$("#example_2").ionRangeSlider({
		min: 1000,
		max: 100000,
		from: 30000,
		to: 90000,
		type: 'double',
		step: 500,
		postfix: " €",
		grid: true
	});

	tpl.$("#example_3").ionRangeSlider({
		min: 0,
		max: 10,
		type: 'single',
		step: 0.1,
		postfix: " carats",
		prettify_enabled: false,
		grid: true
	});

	tpl.$("#example_4").ionRangeSlider({
		min: -50,
		max: 50,
		from: 0,
		postfix: "°",
		prettify_enabled: false,
		grid: true
	});

	tpl.$("#example_5").ionRangeSlider({
		values: [
			"January", "February",
			"March", "April",
			"May", "June",
			"July", "August",
			"September", "October",
			"November", "December"
		],
		type: 'single',
		grid: true
	});

	tpl.$("#example_6").ionRangeSlider({
		min: 10000,
		max: 100000,
		step: 1000,
		postfix: " miles",
		from: 55000,
		hideMinMax: false,
		hideFromTo: true
	});


	//NOUI SLIDER //

	tpl.$(".nouislider_element").each(function (index) {
		var val = tpl.$(this).attr('data-value');
		if (val == null)
			val = 0;
		tpl.$(this).noUiSlider({
			start: val,
			connect: "lower",
			range: {
				'min': 0,
				'max': 100
			}
		});
	});

	tpl.$("#slider-margin").noUiSlider({
		start: [20, 80],
		margin: 30,
		connect: true,
		range: {
			'min': 0,
			'max': 100
		}
	});
	tpl.$("#slider-limit").noUiSlider({
		start: [10, 120],
		limit: 40,
		behaviour: 'drag',
		connect: true,
		range: {
			'min': 0,
			'max': 100
		}
	});

	tpl.$("#slider-limit").Link('lower').to(tpl.$('#slider-limit-value-min'));
	tpl.$("#slider-limit").Link('upper').to(tpl.$('#slider-limit-value-max'));

	tpl.$("#slider-step").noUiSlider({
		start: [20, 80],
		step: 10,
		connect: true,
		range: {
			'min': 0,
			'max': 100
		}
	});

	tpl.$("#slider-vertical").noUiSlider({
		start: [20, 80],
		step: 10,
		margin: 20,
		connect: true,
		direction: 'rtl',
		orientation: 'vertical',
		range: {
			'min': 0,
			'max': 100
		}
	});

	tpl.$("#slider-tooltips").noUiSlider({
		start: 40,
		connect: "lower",
		range: {
			'min': 0,
			'max': 100
		}
	});

	tpl.$("#slider-tooltips").Link('lower').to('-inline-<div class="tooltip fade top in" style="top: -33px;left: -14px;opacity: 0.7;"></div>', function (value) {
		// The tooltip HTML is 'this', so additional
		// markup can be inserted here.
		tpl.$(this).html(
			'<div class="tooltip-inner">' +
			'<span>' + value + '</span>' +
			'</div>'
		);
	});


});

/** Template Helpers */
/*
 Template.sliders.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template.sliders.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template.sliders.onCreated(function () {
 var tpl = this; 
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template.sliders.onDestroyed(function () {
 var tpl = this; 
 // de-registration

 });
 */
 