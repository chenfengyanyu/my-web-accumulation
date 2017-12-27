$(function() {
    $('#myPortlet').portlet({
        onRefresh: function() {
            // Timeout to simulate AJAX response delay
            setTimeout(function() {
                $('#myPortlet').portlet({
                    refresh: false
                });


            }, 2000);
        }
    });
});