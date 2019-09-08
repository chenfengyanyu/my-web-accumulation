/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/

$(document).ready(function() {
    var elem = $('.widget-1');
    elem.card({
        progress: 'circle-lg',
        progressColor: 'white',
        overlayColor: '0,0,0',
        overlayOpacity: 0.6,
        onRefresh: function() {
            setTimeout(function() {
                elem.card({
                    refresh: false
                });
            }.bind(this), 2000);
        }
    });
});