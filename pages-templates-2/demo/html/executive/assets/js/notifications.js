/* ============================================================
 * Notifications
 * Triggers notifications using Pages Notification plugin.
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
(function($) {

    'use strict';

    $(document).ready(function() {

        $('.show-notification').click(function(e) {
            var button = $(this);
            var style = $('.btn-notification-style.active').text(); // Type of notification
            var message = $('.notification-message').val(); // Message to display inside the notification
            var type = $('select.notification-type').val(); // Info, Success, Error etc
            var position = $('.tab-pane.active .position.active').attr('data-placement'); // Placement of the notification

            if (style == 'Bar') {
                // Show an bar notification attached to top and bottom of the screen
                $('.page-container').pgNotification({
                    style: 'bar',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type
                }).show();
            } else if (style == 'Bouncy Flip') {
                // Show a flipping notification animated
                // using CSS3 transforms and animations
                $('.page-container').pgNotification({
                    style: 'flip',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type
                }).show();
            } else if (style == 'Circle Notification') {
                // Slide-in a circle notification from sides
                // You have to provide the HTML for thumbnail
                $('.page-container').pgNotification({
                    style: 'circle',
                    title: 'John Doe',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type,
                    thumbnail: '<img width="40" height="40" style="display: inline-block;" src="assets/img/profiles/avatar2x.jpg" data-src="assets/img/profiles/avatar.jpg" data-src-retina="assets/img/profiles/avatar2x.jpg" alt="">'
                }).show();
            } else if (style == 'Simple Alert') {
                // Simple notification having bootstrap's .alert class
                $('.page-container').pgNotification({
                    style: 'simple',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type
                }).show();
            } else {
                return;
            }

            e.preventDefault();
        });

        $('.position').click(function() {
            $(this).closest('.notification-positions').find('.position').removeClass('active');
            $(this).addClass('active');
        });

        $('.btn-notification-style').click(function() {
            var target = $(this).attr('data-type');
            $('a[href=#' + target + ']').tab('show');
        });

        // remove previously added notifications from the screen
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var position = $(this).data('type');
            $('a[href="'+position+'"]').tab('show')
            $('.pgn').remove();
        });

    });

})(window.jQuery);
