(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, $timeout, $state, products) {
    var vm = this;
    vm.point = location;

    vm.$timeout = $timeout;
    vm.$state = $state;

    console.log(location);
    $scope.$emit('map.zoom', 10);
    $scope.$emit('map.center', vm.point);

    vm.products = products;

    vm.availableTypes = [];
  }

  LocationController.prototype.back = function () {
    var vm = this;
    vm.$state.go('root.places');
  };

  LocationController.prototype.getProducts = function () {
  	var vm = this;
  	vm.$http.get('api/product/' + vm.point._id).then(function (response) {
  		vm.products = response.data;
      vm.availableTypes = _.uniq( _.pluck(vm.products, 'category') );
      vm.availableProducers = _.uniq( _.pluck(vm.products, 'company') );
  	});
  };

})();
