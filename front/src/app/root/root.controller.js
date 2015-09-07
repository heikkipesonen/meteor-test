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

    vm.bindListeners();
  }


  RootController.prototype.bindListeners = function () {
    var vm = this;

    vm.$scope.$on('map.click', function (evt, mapEvent){
    	var marker = vm.mapService.addMarker({
    		position:mapEvent.latLng
    	});

    	google.maps.event.addListener(marker, 'click', function (evt){
    		vm.$state.go('root.location', {id:marker.id});
    	});
    });
  };

})();
