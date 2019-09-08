/* ============================================================
 * cards
 * Create cards using Pages cards plugin. Use data attribute
 * data-pages="card" to auto-initialize a basic card without
 * the refresh option. Please refer to docs for more
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */

(function($) {

    'use strict';

    $('#card-basic').card({
        onRefresh: function() {
            // Timeout to simulate AJAX response delay
            setTimeout(function() {
                // Hides progress indicator
                $('#card-basic').card({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#card-advance').card({
        onRefresh: function() {
            setTimeout(function() {
                // Throw any error you encounter while refreshing
                $('#card-advance').card({
                    error: "Something went terribly wrong. Just keep calm and carry on!"
                });
            }, 2000);
        }
    });


    $('#card-linear').card({
        progress: 'bar',
        onRefresh: function() {
            setTimeout(function() {
                // Hides progress indicator
                $('#card-linear').card({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#card-circular').card({
        progress: 'circle',
        onRefresh: function() {
            setTimeout(function() {
                // Hides progress indicator
                $('#card-circular').card({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#card-circular-minimal').card({
        progress: 'circle-lg',
        overlayOpacity: 0.6,
        onRefresh: function() {
            setTimeout(function() {
                // Hides progress indicator
                $('#card-circular-minimal').card({
                    refresh: false
                });
            }, 2000);
        }
    });


    $('#card-error').card({
        onRefresh: function() {
            setTimeout(function() {
                $('#card-error').card({
                    error: "Something went terribly wrong"
                });
            }, 2000);
        }
    });


    $('#card-linear-color').card({
        progress: 'bar',
        progressColor: 'success',
        onRefresh: function() {

            setTimeout(function() {
                // Hides progress indicator
                $('#card-linear-color').card({
                    refresh: false
                });
            }, 2000);
        }
    });

    $('#card-circular-color').card({
        progress: 'circle',
        progressColor: 'success',
        onRefresh: function() {

            setTimeout(function() {
                // Hides progress indicator
                $('#card-circular-color').card({
                    refresh: false
                });
            }, 2000);
        }
    });

    // Draggable cards are rendered using jQuery Sortable plugin
    if (!jQuery().sortable) {
        return;
    }

    $(".sortable .row .col-lg-6").sortable({
        connectWith: ".sortable .row .col-lg-6",
        handle: ".card-header",
        cancel: ".card-close",
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