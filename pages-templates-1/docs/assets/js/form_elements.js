$(document).ready(function() {



    var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));

    elems.forEach(function(html) {
        var switchery = new Switchery(html, {
            color: '#10CFBD'
        });
    });

    //Only call Select2 on element intended to use with advance options
    $("#mySelect2").select2({
        placeholder: "Select a type",
        data: [{
            id: 0,
            text: 'enhancement'
        }, {
            id: 1,
            text: 'bug'
        }, {
            id: 2,
            text: 'duplicate'
        }]
    });

     $('#myDatepicker').datepicker();

     $("#phone").mask("(999) 999-9999");

       $('.autonumeric').autoNumeric('init');

       $('#tagsinput').tagsinput({
        typeahead: {
            source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
        }
    });

});