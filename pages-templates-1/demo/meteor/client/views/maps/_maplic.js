Template.vector.onRendered(function () {
/* ============================================================
 * Vector Map
 * Render a vector map (SVG) using Mapplic plugin
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */

(function($) {
    'use strict';

    $(document).ready(function() {

        // Apply mapplic plugin 
        $('#mapplic').mapplic({
            source: 'http://revox.io/json/met_countries.json',
            height: '100%',
            search: false,
            sidebar: false,
            minimap: true,
            locations: true,
            deeplinking: true,
            fullscreen: true,
            hovertip: false,
            maxscale: 4,
            animate: true
        });

        // Resets map to default zoom
        $('.clear-map').click(function() {
            $('.mapplic-clear-button').trigger('click');
        });

        // Load country list into select2
        $.getJSON('http://revox.io/json/met_countries.json', function(data) {
            var countryList = [];

            $.each(data.levels[0].locations, function(key, val) {
                countryList.push({
                    id: val.id,
                    text: val.title
                });
            });

            $("#country-list").select2({
                data: countryList,
                width: "240px"
            });

        });

        // jump to country on select2 change
        $('#country-list').change(function() {
            var sel = $('#country-list').select2('data');
            window.location.hash = sel.id;
        });

    });
})(window.jQuery);
});