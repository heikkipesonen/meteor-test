(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('RootController', RootController);

  /** @ngInject */
  function RootController($scope, mapService) {
    var vm = this;
    vm.$scope = $scope;
    vm.mapService = mapService;

    vm.bindListeners();
  }


  RootController.prototype.bindListeners = function () {
    var vm = this;

    vm.$scope.$on('map.click', function (evt, mapEvent){
    	var marker = vm.mapService.addMarker({
    		position:mapEvent.latLng
    	});

    	google.maps.event.addListener(marker, 'click', function (evt){
    		console.log(marker, 'clicked');
    	});
    });
  };

})();
