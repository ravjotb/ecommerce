mapboxgl.accessToken = 'pk.eyJ1IjoicmF2am90YiIsImEiOiJja2VzdjZxNHQxaGFpMnhxdjR6Y3libW1hIn0.0kjaNIHFLPfq8oPiYCn4Gg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: post.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

  // create a HTML element for our location and add it to the map
  var el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
  .addTo(map);
