(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('RootController', RootController);

  /** @ngInject */
  function RootController($scope, mapService, mapUtils, $state, locations) {
    var vm = this;
    vm.$scope = $scope;
    vm.mapService = mapService;
    vm.mapUtils = mapUtils;
    vm.$state = $state;

    vm.setData(locations);
  }

  RootController.prototype.setData = function (data) {
  	var vm = this;
  	var show = vm.showPoint.bind(vm);
  	data.forEach(function(point){
	  	var marker = vm.mapService.addMarker({
	  		id:point.id,
	  		position: vm.mapUtils.toLatLng(point.position),
	  		data:point
	  	});


	  	google.maps.event.addListener(marker, 'click', function(evt){
	  		show(marker, evt);
	  	});
  	});
  };

  RootController.prototype.showPoint = function (marker) {
		var vm = this;

		// var mapCenter = marker.map.getCenter();
		// var mapPosition = vm.mapUtils.getPixelPosition(mapCenter, marker.map);
		var markerPosition = vm.mapUtils.getPixelPosition(marker.position, marker.map);
		var position = [markerPosition[0], markerPosition[1]];
		var headerCenter = [window.innerWidth / 2 , (window.innerWidth * 0.7) / 2];

		marker.map.panBy(position[0] - headerCenter[0], position[1] - headerCenter[1]);
  	vm.$state.go('root.location', {id:marker.id});

  };



})();
