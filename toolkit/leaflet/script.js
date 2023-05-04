(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([32.959389, -117.266296], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker1 = L.marker([32.959389, -117.266296]).addTo(map);
    marker1.bindPopup("<b>Del Mar</b>").openPopup();

    var marker2 = L.marker([32.961008, -117.267882]).addTo(map);
    marker2.bindPopup("<b>Seagrove Park</b>").openPopup();

    var circle = L.circle([32.966886, -117.265953], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50
    }).addTo(map);
    circle.bindPopup("<b>Tennis Courts</b>").openPopup();
}());