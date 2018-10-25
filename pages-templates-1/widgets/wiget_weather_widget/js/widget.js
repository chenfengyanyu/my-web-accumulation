/*
    Widget specific JS (ie: init scripts of 
    plugins used in the widget) go here
*/
var icons = new Skycons(),
    list = [
        "clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"
    ],
    i;
for (i = list.length; i--;) {
    var weatherType = list[i],
        elements = document.getElementsByClassName(weatherType);
    for (var e = elements.length; e--;) {
        icons.set(elements[e], weatherType);
    }
}

icons.play();