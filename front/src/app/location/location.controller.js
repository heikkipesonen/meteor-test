(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, mapUtils, $timeout, mapService) {
    var vm = this;
    vm.point = location;
    vm.mapUtils = mapUtils;
    vm.mapService = mapService;
    vm.$timeout = $timeout;


    vm.position = [0,0];
  }

  LocationController.prototype.centerMap = function () {


console.log(this.point.position, this.mapService.map);


  };



})();
