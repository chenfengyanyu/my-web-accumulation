/**
 * Created by dinos on 10/07/15.
 */

/** Rendered Initialisation */
Template.data.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()

	/* ============================================================
	 * DataTables
	 * Generate advanced tables with sorting, export options using
	 * jQuery DataTables plugin
	 * For DEMO purposes only. Extract what you need.
	 * ============================================================ */

	var responsiveHelper = undefined;
	var breakpointDefinition = {
		tablet: 1024,
		phone: 480
	};

	// Initialize datatable showing a search box at the top right corner
	var initTableWithSearch = function () {
		var table = $('#tableWithSearch');

		var settings = {
			"sDom": "<'table-responsive't><'row'<p i>>",
			"sPaginationType": "bootstrap",
			"destroy": true,
			"scrollCollapse": true,
			"oLanguage": {
				"sLengthMenu": "_MENU_ ",
				"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
			},
			"iDisplayLength": 5
		};

		table.dataTable(settings);

		// search box for table
		$('#search-table').keyup(function () {
			table.fnFilter($(this).val());
		});
	};

	// Initialize datatable with ability to add rows dynamically
	var initTableWithDynamicRows = function () {
		var table = $('#tableWithDynamicRows');


		var settings = {
			"sDom": "<'table-responsive't><'row'<p i>>",
			"sPaginationType": "bootstrap",
			"destroy": true,
			"scrollCollapse": true,
			"oLanguage": {
				"sLengthMenu": "_MENU_ ",
				"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
			},
			"iDisplayLength": 5
		};


		table.dataTable(settings);

		$('#show-modal').click(function () {
			$('#addNewAppModal').modal('show');
		});

		$('#add-app').click(function () {
			table.dataTable().fnAddData([
				$("#appName").val(),
				$("#appDescription").val(),
				$("#appPrice").val(),
				$("#appNotes").val()
			]);
			$('#addNewAppModal').modal('hide');

		});
	};

	// Initialize datatable showing export options
	var initTableWithExportOptions = function () {
		var table = $('#tableWithExportOptions');


		var settings = {
			"sDom": "<'exportOptions'T><'table-responsive't><'row'<p i>>",
			"sPaginationType": "bootstrap",
			"destroy": true,
			"scrollCollapse": true,
			"oLanguage": {
				"sLengthMenu": "_MENU_ ",
				"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
			},
			"iDisplayLength": 5,
			"oTableTools": {
				"sSwfPath": "img/table/TableTools/swf/copy_csv_xls_pdf.swf",
				"aButtons": [{
					"sExtends": "csv",
					"sButtonText": "<i class='pg-grid'></i>",
				}, {
					"sExtends": "xls",
					"sButtonText": "<i class='fa fa-file-excel-o'></i>",
				}, {
					"sExtends": "pdf",
					"sButtonText": "<i class='fa fa-file-pdf-o'></i>",
				}, {
					"sExtends": "copy",
					"sButtonText": "<i class='fa fa-copy'></i>",
				}]
			},
			fnDrawCallback: function (oSettings) {
				$('.export-options-container').append($('.exportOptions'));

				$('#ToolTables_tableWithExportOptions_0').tooltip({
					title: 'Export as CSV',
					container: 'body'
				});

				$('#ToolTables_tableWithExportOptions_1').tooltip({
					title: 'Export as Excel',
					container: 'body'
				});

				$('#ToolTables_tableWithExportOptions_2').tooltip({
					title: 'Export as PDF',
					container: 'body'
				});

				$('#ToolTables_tableWithExportOptions_3').tooltip({
					title: 'Copy data',
					container: 'body'
				});
			}
		};


		table.dataTable(settings);

	};

	initTableWithSearch();
	initTableWithDynamicRows();
	initTableWithExportOptions();

});

/** Template Helpers */
/*
 Template.data.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template.data.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template.data.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template.data.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */
 