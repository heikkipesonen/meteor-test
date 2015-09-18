'use strict';

angular
  .module('lahiruoka')
  .controller('RootController', RootController);

/** @ngInject */
function RootController($scope, mapService, mapUtils, $state, $window, locations) {
  var vm = this;
  vm.$scope = $scope;
  vm.mapUtils = mapUtils;
  vm.$state = $state;
  vm.items = locations;
}
