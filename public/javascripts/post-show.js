mapboxgl.accessToken = 'pk.eyJ1IjoicmF2am90YiIsImEiOiJja2VzdjZxNHQxaGFpMnhxdjR6Y3libW1hIn0.0kjaNIHFLPfq8oPiYCn4Gg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: post.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

  // create a HTML element for our location and add it to the map
  var el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
  .setLngLat(post.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
  .addTo(map);

//Toggle edit review form
$('.toggle-edit-form').on('click', function() {
  //toggle the edit button text on click
  $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');

  //toggle visibility of edit form
  $(this).siblings('.edit-review-form').toggle();
});

//Add click listener for clearing of rating from edit/new form

$('.clear-rating').click(function(){
  $(this).siblings('.input-no-rate').click();
});
