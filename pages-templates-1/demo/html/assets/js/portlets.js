/* ============================================================
 * Portlets
 * Create portlets using Pages Portlets plugin. Use data attribute
 * data-pages="portlet" to auto-initialize a basic portlet without
 * the refresh option. Please refer to docs for more
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */

(function($) {

    'use strict';

    $('#portlet-basic').portlet({
        onRefresh: function() {
            // Timeout to simulate AJAX response delay
            setTimeout(function() {
                // Hides progress indicator
                $('#portlet-basic').portlet({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#portlet-advance').portlet({
        onRefresh: function() {
            setTimeout(function() {
                // Throw any error you encounter while refreshing
                $('#portlet-advance').portlet({
                    error: "Something went terribly wrong. Just keep calm and carry on!"
                });
            }, 2000);
        }
    });


    $('#portlet-linear').portlet({
        progress: 'bar',
        onRefresh: function() {
            setTimeout(function() {
                // Hides progress indicator
                $('#portlet-linear').portlet({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#portlet-circular').portlet({
        progress: 'circle',
        onRefresh: function() {
            setTimeout(function() {
                // Hides progress indicator
                $('#portlet-circular').portlet({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#portlet-circular-minimal').portlet({
        progress: 'circle-lg',
        overlayOpacity: 0.6,
        onRefresh: function() {
            setTimeout(function() {
                // Hides progress indicator
                $('#portlet-circular-minimal').portlet({
                    refresh: false
                });
            }, 2000);
        }
    });


    $('#portlet-error').portlet({
        onRefresh: function() {
            setTimeout(function() {
                $('#portlet-error').portlet({
                    error: "Something went terribly wrong"
                });
            }, 2000);
        }
    });


    $('#portlet-linear-color').portlet({
        progress: 'bar',
        progressColor: 'success',
        onRefresh: function() {

            setTimeout(function() {
                // Hides progress indicator
                $('#portlet-linear-color').portlet({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#portlet-circular-color').portlet({
        progress: 'circle',
        progressColor: 'success',
        onRefresh: function() {

            setTimeout(function() {
                // Hides progress indicator
                $('#portlet-circular-color').portlet({
                    refresh: false
                });
            }, 2000);
        }
    });

    // Draggable portlets are rendered using jQuery Sortable plugin
    if (!jQuery().sortable) {
        return;
    }

    $(".sortable .row .col-md-6").sortable({
        connectWith: ".sortable .row .col-md-6",
        handle: ".panel-heading",
        cancel: ".portlet-close",
        placeholder: "sortable-box-placeholder round-all",

        forcePlaceholderSize: true,
        tolerance: 'pointer',
        forceHelperSize: true,
        revert: true,
        helper: 'original',
        opacity: 0.8,
        iframeFix: false
    });


})(window.jQuery);