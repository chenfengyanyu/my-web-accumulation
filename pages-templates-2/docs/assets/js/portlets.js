$(function() {
    $('#myPortlet').card({
        onRefresh: function() {
            // Timeout to simulate AJAX response delay
            setTimeout(function() {
                $('#myPortlet').card({
                    refresh: false
                });


            }, 2000);
        }
    });
});