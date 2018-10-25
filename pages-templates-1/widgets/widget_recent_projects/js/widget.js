/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/


(function() {
	$('[data-toggler="task"]').on("click",function(){
		$(this).parent().parent().parent().find('[data-toggler="task"]').toggleClass("strikethrough");
	});
})();