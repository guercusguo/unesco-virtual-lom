// ------- CHAPTERS ON MAP ---------
var chapters = {
'arte-rupestre-della-valle-camonica-1': {
bearing: 0,
center: [10.25323,46.02772],
zoom: 10,
speed: 0.3,
pitch: 40
},
'arte-rupestre-della-valle-camonica-2': {
bearing: 0,
center: [10.339044,46.030576],
zoom: 12,
speed: 0.4,
pitch: 40
},
'villaggio-industriale-di-crespi-dadda-1': {
bearing: 0,
center: [9.536066,45.597665],
zoom: 13,
speed: 0.4,
curve: 1,
pitch: 40
},
'villaggio-industriale-di-crespi-dadda-2': {
center: [9.535957,45.598542],
bearing: 0,
zoom: 12,
speed: 0.4,
pitch: 0
},
'santa-maria-delle-grazie-e-cenacolo-vinciano-1': {
bearing: 0,
center: [9.170618,45.466237],
zoom: 16,
speed: 0.3,
pitch: 40
},
'santa-maria-delle-grazie-e-cenacolo-vinciano-2': {
bearing: 0,
center: [9.17067,45.466001],
zoom: 16,
speed: 0.4,
pitch: 40
},
'sacri-monti-del-piemonte-e-lombardia-1': {
bearing: 0,
center: [9.177540,45.974532],
zoom: 13,
speed: 0.3,
pitch: 40
},
'sacri-monti-del-piemonte-e-lombardia-2': {
bearing: 0,
center: [8.792243,45.860223],
zoom: 12,
speed: 0.4,
pitch: 40
},
'monte-san-giorgio-1': {
center: [8.91066,45.87662],
bearing: 0,
zoom: 11,
speed: 0.4,
pitch: 40
},
'monte-san-giorgio-2': {
bearing: 0,
center: [8.953134,45.890505],
zoom: 16,
speed: 0.4,
pitch: 40
},
'mantova-e-sabbioneta-1': {
bearing: 0,
center: [10.802641,45.161125],
zoom: 11,
speed: 0.4,
pitch: 40
},
'mantova-e-sabbioneta-2': {
bearing: 0,
center: [10.489841,44.999562],
zoom: 12,
speed: 0.4,
pitch: 40
},
'la-ferrovia-retica-nel-paesaggio-del-abula-e-del-bernina-1': {
bearing: 0,
center: [10.125940,46.261320],
zoom: 11,
speed: 0.4,
pitch: 40
},
'la-ferrovia-retica-nel-paesaggio-del-abula-e-del-bernina-2': {
center: [10.127888,46.254249],
bearing: 0,
zoom: 15,
speed: 0.4,
pitch: 0
},
'i-siti-palafitticoli-preistorici-dellarco-alpino-1': {
bearing: 0,
center: [10.56257,45.46226],
zoom: 10,
speed: 0.2,
pitch: 60
},
'i-siti-palafitticoli-preistorici-dellarco-alpino-2': {
bearing: 0,
center: [8.69944,45.80057],
zoom: 11,
speed: 0.2,
pitch: 70
},
'i-longobardi-in-italia-i-luoghi-del-potere-1': {
bearing: 0,
center: [10.225857,45.539511],
zoom: 16,
speed: 0.2,
pitch: 40
},
'i-longobardi-in-italia-i-luoghi-del-potere-2': {
bearing: 0,
center: [8.857443,45.728933],
zoom: 14,
speed: 0.3,
pitch: 40
},
'opere-di-difesa-veneziane-1': {
center: [8.718225,45.811755],
bearing: 0,
zoom: 13,
speed: 0.3,
pitch: 40
},
'opere-di-difesa-veneziane-2': {
bearing: 0,
center: [9.663021,45.701215],
zoom: 16,
speed: 0.4,
pitch: 85
}
};

// -------- SOURCES ADD ---------

//Load of GeoJSON data
var geojson;
function addSource() {
map.addSource('lombardia_aree', {
'type': 'geojson',
'data': 'assets/json/zones.geojson'
});
// Mapbox default DEM source
map.addSource('mapbox-dem', {
'type': 'raster-dem',
'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
'tileSize': 256,
'maxzoom': 14
});
} //END of addSource

// List of added layers; rendering and symbology of GeoJSON data.
function addLayer() {
map.addLayer({
'id': 'fill_area',
'type': 'fill',
'source': 'lombardia_aree', // reference the data source
'layout': {
// Make the layer visible by default.
'visibility': 'visible'
},
'paint': {
'fill-color': [
  'match',
  ['get', 'TIPO_AREA'],
  'Buffer Zone',
  '#92c5de',
  'Componente',
  '#f4a582',
  '#ccc'
],
//'fill-color': '#0080ff', // blue color fill
'fill-opacity': 0.5
}
});
// Add a black outline around the polygon.
map.addLayer({
'id': 'outline_area',
'type': 'line',
'source': 'lombardia_aree',
'layout': {
// Make the layer visible by default.
'visibility': 'visible'
},
'paint': {
'line-width': 1.5,
'line-color': [
  'match',
  ['get', 'TIPO_AREA'],
  'Buffer Zone',
  '#92c5de',
  'Componente',
  '#f4a582',
  '#ccc'
],
}
});
map.addLayer({
'id': 'sky',
'type': 'sky',
'paint': {
'sky-type': 'atmosphere',
'sky-atmosphere-sun': [0.0, 0.0],
'sky-atmosphere-sun-intensity': 15
}
});
// 3D properties
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.2 });
// END of 3D properties
}
//END of addLayer

// -------- INTERACTIVE SCROLL ----------
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

// Chapter-scrolling: On every scroll event, check which element is on screen
window.onscroll = function () {
var chapterNames = Object.keys(chapters);
for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};

var activeChapterName = 'arte-rupestre-della-valle-camonica-1';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;

map.flyTo(chapters[chapterName]);

document.getElementById(chapterName).setAttribute('class', 'active');
document.getElementById(activeChapterName).setAttribute('class', '');

activeChapterName = chapterName;
}

function isElementOnScreen(id) {
var element = document.getElementById(id);
var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}
// End of chapter-scrolling

// Basemap switch
map.on('style.load', function() {
addSource();
addLayer();
});
function switchLayer(layer) {
var layerId = layer.target.id;
map.setStyle('mapbox://styles/guercusguo/' + layerId);
};
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer; }
// End of Basemap switch

map.addControl(new mapboxgl.NavigationControl());

// START of popup on click for areal features
map.on('load', function () {
map.on('click', 'lombardia_aree', function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.SITO;

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'lombardia_aree', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'lombardia_aree', function () {
map.getCanvas().style.cursor = '';
});

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});
});

// END of popup on click for pointal features

// Return to map extent
document.getElementById('fit').addEventListener('click', function () {
map.fitBounds([
[8.5491, 44.9638], // southwestern corner of the bounds
[10.9207, 46.2511] // northeastern corner of the bounds
]);
});
// END of Return to map extent
