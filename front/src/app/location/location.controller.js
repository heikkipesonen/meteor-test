(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, mapUtils, $timeout) {
    var vm = this;
    vm.point = location;
    vm.mapUtils = mapUtils;
    vm.$timeout = $timeout;


    vm.position = [0,0];

    vm.getPosition();
    console.log(vm);
    var getPosition = vm.getPosition.bind(vm);
    google.maps.event.addListener(vm.point, 'drag', getPosition);

    $scope.$on('$destroy', function () {
    	google.maps.event.removeListener(vm.point, 'drag', getPosition);
    });
  }


  LocationController.prototype.getPosition = function () {
  	var vm = this;
  	vm.position = vm.mapUtils.toPoint(vm.point.position);
  	vm.$timeout(function(){});
  };

})();
