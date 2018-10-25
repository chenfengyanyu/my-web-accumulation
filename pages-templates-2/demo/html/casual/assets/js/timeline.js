jQuery(document).ready(function($){
	var $timeline_block = $('.timeline-block');

	//hide timeline blocks which are outside the viewport
	///USE Page container for Horizontal Menu
	$timeline_block.each(function(){
		if($(this).offset().top > $(".page-container ").scrollTop()+$(".page-container").height()*0.75) {
			$(this).find('.timeline-point, .timeline-content').addClass('is-hidden');
		}
	});


	//USE Page container for Horizontal Menu
	//on scolling, show/animate timeline blocks when enter the viewport
	$(".page-container ").on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(".page-container").scrollTop()+$(".page-container").height()*0.75 && $(this).find('.timeline-point').hasClass('is-hidden') ) {
				$(this).find('.timeline-point, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});