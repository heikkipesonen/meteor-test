(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('RootController', RootController);

  /** @ngInject */
  function RootController($scope, mapService, $state) {
    var vm = this;
    vm.$scope = $scope;
    vm.mapService = mapService;
    vm.$state = $state;
  }

  RootController.prototype.create = function () {
  	var vm = this;

  	var marker = vm.mapService.addMarker({
  		position:vm.mapService.map.getCenter(),
  		draggable:true,
  		properties:{
  			name:'new place'
  		}
  	});

		vm.$state.go('root.location', {id:marker.id});

		google.maps.event.addListener(marker, 'click', function () {
			vm.$state.go('root.location', {id:marker.id});
		});

  };


})();
