(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('RootController', RootController);

  /** @ngInject */
  function RootController($scope, mapService, mapUtils, $state, locations) {
    var vm = this;
    vm.$scope = $scope;
    vm.mapUtils = mapUtils;
    vm.$state = $state;
    vm.items = locations;

    // vm.setData(locations);
  }

  RootController.prototype.setData = function (data) {
  	var vm = this;
    vm.items = data;
  };

  RootController.prototype.showPoint = function (marker) {
		var vm = this;

		// var mapCenter = marker.map.getCenter();
		// var mapPosition = vm.mapUtils.getPixelPosition(mapCenter, marker.map);


  };



})();
