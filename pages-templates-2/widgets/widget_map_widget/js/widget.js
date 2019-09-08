/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
// Widget 13
        $('.widget-13-map').mapplic({
            source: 'http://revox.io/json/widget-map.json',
            height: 465,
            sidebar: false,
            minimap: false,
            locations: true,
            deeplinking: true,
            fullscreen: false,
            developer: false,
            maxscale: 3
        });

        // Disable scroll to zoom
        setTimeout(function() {
            location.hash = "#usa";
            $('.mapplic-layer').unbind('mousewheel DOMMouseScroll');
        }, 1000);


        $('.widget-13 a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var target = $(e.target).text().trim();
            var hash;
            if (target == 'fb') {
                hash = '#usa';
            } else if (target == 'sa') {
                hash = '#af';
            } else if (target == 'js') {
                hash = '#ru';
            }
            window.location.hash = hash;
        });