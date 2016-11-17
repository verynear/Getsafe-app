(function() {
  "use strict"; 

    angular.module("app").controller("alertsCtrl", function($scope) {

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

    // $scope.homeland = function(alertZone) {

    //     SCHEDULER.every '2s', :first_in => 0 do |job|
    //         doc = Nokogiri::XML(open("http://www.dhs.gov/ntas/1.0/alerts.xml"))
    //         x=0
    //         doc.xpath("//alert").each do 
    //         x+=1
    //         end
    //       send_event('no_of_alerts', { current: x })
    //     end
    // };

    $scope.getDistance = function(latitude, longitude) {

            var userPosition = new google.maps.LatLng(latitude, longitude);
            var alertPosition = new google.maps.LatLng(alertLat, alertLon);
            

            distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, alertPosition);
        };
 
  });
}());