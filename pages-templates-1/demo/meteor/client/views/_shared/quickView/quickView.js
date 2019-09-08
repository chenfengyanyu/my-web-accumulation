Template.quickView.rendered = function () {
	$('[data-navigate="view"]').on('click', function (e) {
		e.preventDefault();
		var el = $(this).attr('data-view-port');
		if ($(this).attr('data-toggle-view') != null) {
			$(el).children().last().children('.view').hide();
			$($(this).attr('data-toggle-view')).show();
		}
		$(el).toggleClass($(this).attr('data-view-animation'));
		return false;
	})
	$.Pages.initScrollBarPlugin();
	$('[data-navigate="view"]').each(function() {
        var $mobileView = $(this)
        $mobileView.pgMobileViews();
    })
};