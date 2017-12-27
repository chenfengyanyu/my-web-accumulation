$(function() {
    $("#noUiSlider, #noUiSliderOne, #noUiSliderTwo, #noUiSliderThree").noUiSlider({
        start: 40,
        connect: "lower",
        range: {
            'min': 0,
            'max': 100
        }
    });

    $("#ionSlider, #ionSliderOne, #ionSliderTwo, #ionSliderThree, #ionSliderFour").ionRangeSlider({
	    min: 0,
	    max: 5000,
	    type: 'double',
	    prefix: "$",
	    maxPostfix: "+",
	    prettify: false,
	    hasGrid: true
	});
});