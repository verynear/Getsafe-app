(function() {
  "use strict"; 

    angular.module("app").controller("alertsisrCtrl", function($scope) {

    window.onload = function getLocation() {
            navigator.geolocation.getCurrentPosition(showPosition);
        };

    var x = document.getElementById("userpos");

    function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    };


    var pikudHaoref = require('pikud-haoref-api/index.js');

    // Set polling interval in millis
    var interval = 5000;

    // Define polling function
    $scope.poll = function() {
        // Get currently active rocket alert zones as an array of zone codes
        // Example response: ["גולן 1", "חיפה 75", "שפלה 182"]
        pikudHaoref.getActiveRocketAlertZones(function(err, alertZones) {
            // Schedule polling in X millis
            setTimeout($scope.poll, interval);

            // Log errors
            if (err) {
                return console.log('Retrieving active rocket alert zones failed: ', err);
            }

            // Alert zones header
            console.log('Currently active rocket alert zones:');

            // Log the alert zones (if any)
            console.log(alertZones);

            // Line break for readability
            console.log();
        });
    };
 
    $scope.getDistance = function(latitude, longitude) {

            var userPosition = new google.maps.LatLng(latitude, longitude);
            var alertPosition = new google.maps.LatLng(alertLat, alertLon);
            

            distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, alertPosition);
        };
        
  });
}());