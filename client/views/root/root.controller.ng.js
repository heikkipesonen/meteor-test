(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('RootController', RootController);

  /** @ngInject */
  function RootController($scope, mapService, mapUtils, $state, $window, $meteor) {
    var vm = this;
    vm.$scope = $scope;
    vm.mapService = mapService;
    vm.mapUtils = mapUtils;
    vm.$state = $state;
    vm.$window = $window;

    $meteor.autorun($scope, function () {
      Locations.find({}).observe({
        added: function (location) {
          vm.addLocation(location);
        },
        changed: function (location) {
          console.log('changed', location);
        },
        removed: function (location) {
          console.log('removed', location);
        }
      });
    });
  }

  RootController.prototype.addLocation = function (data) {
  	var vm = this;
    var marker = vm.mapService.addMarker({
      id: data._id,
      position: vm.mapUtils.toLatLng([data.latitude, data.longitude]),
      data: data
    });

    google.maps.event.addListener(marker, 'click', function (evt) {
      vm.showPoint(marker, evt);
    });
  };

  RootController.prototype.showPoint = function (marker) {
		var vm = this;

		// var mapCenter = marker.map.getCenter();
		// var mapPosition = vm.mapUtils.getPixelPosition(mapCenter, marker.map);
		var markerPosition = vm.mapUtils.getPixelPosition(marker.position, marker.map);
		var position = [markerPosition[0], markerPosition[1]];
		var headerCenter = [vm.$window.innerWidth / 2 , (vm.$window.innerWidth * 0.7) / 2];

		marker.map.panBy(position[0] - headerCenter[0], position[1] - headerCenter[1]);
  	vm.$state.go('root.location', {id:marker.id});

  };



})();
