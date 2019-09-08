/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/

$(document).ready(function() {

    $('#rankingDatepicker').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        format: 'MM/DD/YYYY h:mm A'
    }, function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
    });

    var table = $('#rankingTable');

        var settings = {
            "sDom": "<'table-responsive't><'row'<p i>>",
            "destroy": true,
            "autoWidth" : false,
            "scrollCollapse": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
            },
            "iDisplayLength": 5
        };

        table.dataTable(settings);

});