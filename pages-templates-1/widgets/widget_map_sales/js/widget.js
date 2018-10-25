/* ============================================================
 * Google Map
 * Render maps using Google Maps JS API
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
(function($) {

    'use strict';

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    var map;
    var zoomLevel = 15;

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: zoomLevel,
            disableDefaultUI: true,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.715, -74.008), // New York

            // Map styling
            styles: [{
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "saturation": "-100"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#545454"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "saturation": "-87"
                }, {
                    "lightness": "-40"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#f0f0f0"
                }, {
                    "saturation": "-22"
                }, {
                    "lightness": "-16"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "saturation": "-52"
                }, {
                    "hue": "#00e4ff"
                }, {
                    "lightness": "-16"
                }]
            }]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        map = new google.maps.Map(mapElement, mapOptions);

        var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(40.712, -74.014),
                    map: map,
                    title: 'Revox'
                });

          var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(40.7143528, -74.0059731),
                    map: map,
                    title: 'Revox'
                });
    }

    $(document).ready(function() {
        $('#map-zoom-in').click(function() {
            map.setZoom(++zoomLevel);
        });
        $('#map-zoom-out').click(function() {
            map.setZoom(--zoomLevel);
        });
    });

})(window.jQuery);