var map;

function onError(err){
  console.log("What are you using, IE 7??", err);
}


if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}


function createMap(position){
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 17
  });
}

function createMarker(position) {
  var marker = new google.maps.Marker({
   position: position,
   map: map
 });
}







function onLocation(position) {
 
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  createMap(myPosition);
  createMarker(myPosition);
  setupAutocomplete();
}


function setupAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    } else {
      alert("The place has no location...?")
    }
  });
}

