Template.views.onRendered(function () {
	var tpl = this;
	'use strict';
	$('[data-navigate="view"]').each(function() {
        var $mobileView = $(this)
        $mobileView.pgMobileViews();
    })
});