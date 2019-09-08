import './_header.html';

Template.condensedHeader.onRendered(function () {
	$('[data-toggle="dropdown"]').dropdown();
});
