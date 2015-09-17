(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, mapUtils, $timeout, $http, mapService) {
    var vm = this;
    vm.point = location;
    vm.mapUtils = mapUtils;
    vm.mapService = mapService;
    vm.$timeout = $timeout;
    vm.$http = $http;


    vm.getProducts();
  }

  LocationController.prototype.getProducts = function () {
  	var vm = this;
  	vm.$http.get('api/product/' + vm.point._id).then(function (response) {
  		vm.products = response.data;
  	});
  };

})();
