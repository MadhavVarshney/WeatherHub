// const { getParsedCommandLineOfConfigFile } = require("typescript");

$(document).ready(function () {
  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    localStorage.setItem('lattitude', lat);
    localStorage.setItem('longitude', lon)
  }

  function activatePlacesSearch() {
    var input = document.getElementById('locationBox').val();
    console.log(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
  }
});
