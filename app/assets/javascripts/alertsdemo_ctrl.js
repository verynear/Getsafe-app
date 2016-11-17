(function() {
  "use strict"; 

    angular.module("app").controller("alertsdemoCtrl", function($scope, $http) {

    window.onload = function getLocation() {
            navigator.geolocation.getCurrentPosition(showPosition);
        };

    var x = document.getElementById("userpos");

    function showPosition(position) {
      x.innerHTML = Math.trunc(position.coords.latitude) + 
      " N " + Math.trunc(position.coords.longitude) + " W";
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    };

    var y = document.getElementById("alertpos");

    $scope.fetchAlert = function() {
      $http.get("/api/alerts.json").then(function(response) {
          $scope.alerts = response.data;
          console.log($scope.alerts);
          var i = Math.floor((Math.random() * 5) + 1);
          $scope.alert1 = $scope.alerts[0];
          $scope.alertLat = $scope.alert1.latitude;
          $scope.alertLon = $scope.alert1.longitude;
          y.innerHTML = $scope.alertLat + "N" + $scope.alertLon + "W";
      $scope.getDistance();
      $scope.testRange($scope.fetchShelters);
      });
    };

    $scope.getDistance = function(pos1, pos2) {

            $scope.userPosition = new google.maps.LatLng($scope.latitude, $scope.longitude);
            $scope.alertPosition = new google.maps.LatLng($scope.alertLat, $scope.alertLon);

            $scope.distancemeters = google.maps.geometry.spherical.computeDistanceBetween($scope.userPosition, $scope.alertPosition);
            $scope.distancemiles = $scope.distancemeters/1609.34;
        };

    var r = document.getElementById("range");

    $scope.testRange = function(callback) {
      if ($scope.distancemiles < 20) {
        $scope.range = true;
        r.innerHTML = "Local Alert";
      } else {
        $scope.range = false;
        r.innerHTML = "Alert not in range -" + $scope.distancemiles + "away";
      }
      if ($scope.range) {
        callback();
        $scope.alert();  
      }
    };

    var v = document.getElementById("pending");

    $scope.alert = function() {
      setTimeout($scope.flash(), 1000);
    };

    $scope.flash = function() {
      v.innerHTML = "Finding Closest Shelter";
      document.getElementById("range").style.color="red";
    }; 

    $scope.fetchShelters = function(callback) {
      $http.get("/api/shelters.json").then(function(response) {
          $scope.shelters = response.data;
          $scope.addstrings = []
          for (var i = 0; i < $scope.shelters.length; i++) {
            $scope.addstrings.push($scope.shelters[i]["addstring"]);
          }
          $scope.initMap();
      });
    };

    $scope.initMap = function() {
      var bounds = new google.maps.LatLngBounds;
      var markersArray = [];

      $scope.origin1 = $scope.userPosition;

      var destinationIcon = 'https://chart.googleapis.com/chart?' +
          'chst=d_map_pin_letter&chld=D|0000FF|000000';
      var originIcon = 'https://chart.googleapis.com/chart?' +
          'chst=d_map_pin_letter&chld=O|FF0000|000000';
      var map = new google.maps.Map(document.getElementById("map1"), {
        zoom: 10,
        center: {lat: 41.88, lng: -87.63}
      });
      var geocoder = new google.maps.Geocoder;

      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [$scope.origin1],
        destinations: $scope.addstrings,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          $scope.response = response;
          $scope.originList = response.originAddresses;
          $scope.destinationList = response.destinationAddresses;
          var outputDiv = document.getElementById('output');
          outputDiv.innerHTML = '';
          $scope.deleteMarkers(markersArray);

          var showGeocodedAddressOnMap = function(asDestination) {
            var icon = asDestination ? destinationIcon : originIcon;
            return function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.fitBounds(bounds.extend(results[0].geometry.location));
                markersArray.push(new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: icon
                }));

              } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                setTimeout(function() {
                  showGeocodedAddressOnMap();
                  }, 250 );
              } else {
                alert('Geocode was not successful due to: ' + status);
              };
            };
          };

            $scope.closestdur = 500000;
            $scope.closestshelter = $scope.destinationList[0];
            $scope.closesttime = '';
            $scope.closestdis = '';
            $scope.originList[0] = '350 North Orleans Street, Chicago, IL 60654, USA'

            for (var i = 0; i < $scope.originList.length; i++) {
              $scope.results = response.rows[i].elements;
              geocoder.geocode({'address': $scope.originList[i]},
                  showGeocodedAddressOnMap(false));
              for (var j = 0; j < $scope.results.length; j++) {
                geocoder.geocode({'address': $scope.destinationList[j]},
                    showGeocodedAddressOnMap(true));
                    if ($scope.results[j].duration.value < $scope.closestdur) {
                      $scope.closestdur = $scope.results[j].duration.value;
                      $scope.closesttime = $scope.results[j].duration.text;
                      $scope.closestdis =  $scope.results[j].distance.text;
                      $scope.closestshelter = $scope.destinationList[j]; 
                    }
              };

                  
            };

            outputDiv.innerHTML = 'Closest Shelter is located at ' + $scope.closestshelter +
                          ' -- which is ' + $scope.closestdis + ' away. Estimated driving time is ' +
                          $scope.closesttime + '<br> Click here for directions:' ;

          };

      });
    };

    $scope.deleteMarkers = function(markersArray) {
      for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
      }
      markersArray = [];
    }


    $scope.initMap1 = function() {
      $scope.directionsDisplay = new google.maps.DirectionsRenderer;
      $scope.directionsService = new google.maps.DirectionsService;
      var map2 = new google.maps.Map(document.getElementById("map2"), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
      });
      $scope.calculateAndDisplayRoute($scope.directionsService, $scope.directionsDisplay);
      $scope.directionsDisplay.setMap(map2);
      $scope.directionsDisplay.setPanel(document.getElementById('left-panel'));
      z.innerHTML = '<h5 class="text-dark-color text-normal">Driving Directions</h5>';
    };

    var z = document.getElementById("directions");

    $scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
      var start = $scope.origin1;
      var end = $scope.closestshelter;
      directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    window.scope = $scope
 
  });
}());