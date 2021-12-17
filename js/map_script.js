mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VlcmN1c2d1byIsImEiOiJja29vYTVmdXIwMnJjMm5vanBrb2dwZmp1In0.GFGEzzSYk1QNXmqJ-9lhjA';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/guercusguo/ckqc3h3i600gu18pgwzh0qpjt', // style URL
center: [7.96339,44.61254], // starting position
zoom: 12 // starting zoom
// pitch: 85,
// bearing: 80,
});
// chapters on map
var chapters = {
'arte-rupestre-della-valle-camonica-1': {
duration: 7000,
bearing: 0,
center: [7.96339,44.61254],
zoom: 13,
speed: 0.6,
pitch: 40
},
'arte-rupestre-della-valle-camonica-2': {
duration: 7000,
bearing: 0,
center: [7.9940737,44.6523347],
zoom: 15,
speed: 0.6,
pitch: 40
},
'villaggio-industriale-di-crespi-dadda-1': {
duration: 7000,
bearing: 0,
center: [8.085396,44.719634],
zoom: 13,
speed: 0.6,
pitch: 40
},
'villaggio-industriale-di-crespi-dadda-2': {
duration: 7000,
center: [8.247222,44.740324],
bearing: 0,
zoom: 12,
speed: 0.6,
pitch: 40
},
'santa-maria-delle-grazie-e-cenacolo-vinciano-1': {
duration: 7000,
bearing: 0,
center: [8.30319,44.79613],
zoom: 12,
speed: 0.6,
pitch: 40
},
'santa-maria-delle-grazie-e-cenacolo-vinciano-2': {
duration: 7000,
bearing: 0,
center: [7.96339,44.61254],
zoom: 13,
speed: 0.6,
pitch: 40
},
'sacri-monti-del-piemonte-e-lombardia-1': {
duration: 7000,
bearing: 0,
center: [7.9940737,44.6523347],
zoom: 15,
speed: 0.6,
pitch: 40
},
'sacri-monti-del-piemonte-e-lombardia-2': {
duration: 7000,
bearing: 0,
center: [8.085396,44.719634],
zoom: 13,
speed: 0.6,
pitch: 40
},
'monte-san-giorgio-1': {
duration: 7000,
center: [8.247222,44.740324],
bearing: 0,
zoom: 12,
speed: 0.6,
pitch: 40
},
'monte-san-giorgio-2': {
duration: 7000,
bearing: 0,
center: [8.30319,44.79613],
zoom: 12,
speed: 0.6,
pitch: 40
},
'mantova-e-sabbioneta-1': {
duration: 7000,
bearing: 0,
center: [7.96339,44.61254],
zoom: 13,
speed: 0.6,
pitch: 40
},
'mantova-e-sabbioneta-2': {
duration: 7000,
bearing: 0,
center: [7.9940737,44.6523347],
zoom: 15,
speed: 0.6,
pitch: 40
},
'la-ferrovia-retica-nel-paesaggio-del-abula-e-del-bernina-2': {
duration: 7000,
bearing: 0,
center: [8.085396,44.719634],
zoom: 13,
speed: 0.6,
pitch: 40
},
'la-ferrovia-retica-nel-paesaggio-del-abula-e-del-bernina-2': {
duration: 7000,
center: [8.247222,44.740324],
bearing: 0,
zoom: 12,
speed: 0.6,
pitch: 40
},
'i-siti-palafitticoli-preistorici-dellarco-alpino-1': {
duration: 7000,
bearing: 0,
center: [8.30319,44.79613],
zoom: 12,
speed: 0.6,
pitch: 40
},
'i-siti-palafitticoli-preistorici-dellarco-alpino-2': {
duration: 7000,
bearing: 0,
center: [7.96339,44.61254],
zoom: 13,
speed: 0.6,
pitch: 40
},
'i-longobardi-in-italia-i-luoghi-del-potere-1': {
duration: 7000,
bearing: 0,
center: [7.9940737,44.6523347],
zoom: 15,
speed: 0.6,
pitch: 40
},
'i-longobardi-in-italia-i-luoghi-del-potere-2': {
duration: 7000,
bearing: 0,
center: [8.085396,44.719634],
zoom: 13,
speed: 0.6,
pitch: 40
},
'opere-di-difesa-veneziane-1': {
duration: 7000,
center: [8.247222,44.740324],
bearing: 0,
zoom: 12,
speed: 0.6,
pitch: 40
},
'opere-di-difesa-veneziane-2': {
duration: 7000,
bearing: 0,
center: [8.30319,44.79613],
zoom: 12,
speed: 0.6,
pitch: 40
},
};

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

var activeChapterName = 'langa-barolo';
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

//Load of GeoJSON data
var geojson;
function addSource() {
map.addSource('lombardia_aree', {
'type': 'geojson',
'data': '/assets/json/zones.geojson'
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
  'Buffer zone',
  '#feebe2',
  'Componente',
  '#f768a1',
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
'line-color': '#000',
'line-width': 1
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
// still incomplete
// End of Basemap switch
map.addControl(new mapboxgl.NavigationControl());

// START of popup on click for pointal features
map.on('load', function () {
map.on('click', 'paesaggi_aree', function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.NOME;

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

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'paesaggi_aree', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'paesaggi_aree', function () {
map.getCanvas().style.cursor = '';
});
});
// END of popup on click for pointal features

// Return to map extent
document.getElementById('fit').addEventListener('click', function () {
map.fitBounds([
[8.5994, 44.523151], // southwestern corner of the bounds
[10.8722, 44.9634] // northeastern corner of the bounds
]);
});
// END of Return to map extent
