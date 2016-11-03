'use strict';

function mapCtrl() {
  var vm = this;
  
  vm.baseOptions = {
    scrollwheel: false,
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 8
  };
  
  // Specify features and elements to define styles.
  var styleArray = [{
    featureType: 'all',
    stylers: [{
      saturation: -80
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      hue: '#00ffee'
    }, {
      saturation: 50
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }];
  
  vm.styleMapOptions = {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    scrollwheel: false,
    styles: styleArray,
    zoom: 8
  };
  
  vm.satelliteMapOptions = {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    scrollwheel: false,
    zoom: 8
  };
  
  var chicago = {
    lat: 41.85,
    lng: -87.65
  };
  
  var indianapolis = {
    lat: 39.79,
    lng: -86.14
  };
  
  vm.directionsMapOptions = {
    center: chicago,
    scrollwheel: false,
    zoom: 7
  };
  
  vm.loadDirections = function() {
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: vm.directionsMap
    });
    // Set destination, origin and travel mode.
    var request = {
      destination: indianapolis,
      origin: chicago,
      travelMode: google.maps.TravelMode.DRIVING
    };
    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  };
  
  var myLatLng = {
    lat: -25.363,
    lng: 131.044
  };
  
  vm.markersMapOptions = {
    center: myLatLng,
    markers: [],
    scrollwheel: false,
    zoom: 4
  };
  
  vm.loadMarkers = function() {
    if (vm.markersMap !== undefined) {
      var marker = new google.maps.Marker({
        map: vm.markersMap,
        position: myLatLng,
        title: 'Hello World!'
      });
    }
  };
}
angular.module('app').controller('mapCtrl', mapCtrl);