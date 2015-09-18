(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, mapUtils, $timeout, $http, mapService, $state) {
    var vm = this;
    vm.point = location;
    vm.mapUtils = mapUtils;
    vm.mapService = mapService;
    vm.$timeout = $timeout;
    vm.$http = $http;
    vm.$state = $state;

    console.log('location');
    $scope.$emit('map.zoom', 10);
    $scope.$emit('map.center', vm.point);

    vm.availableTypes = [];
    vm.getProducts();
  }

  LocationController.prototype.back = function () {
    var vm = this;
    vm.$state.go('root.places');
  };

  LocationController.prototype.getProducts = function () {
  	var vm = this;
  	vm.$http.get('app/products.json').then(function (response) {
  		vm.products = response.data;
      vm.availableTypes = _.uniq( _.pluck(vm.products, 'category') );
      vm.availableProducers = _.uniq( _.pluck(vm.products, 'company') );
  	});
  };

})();
