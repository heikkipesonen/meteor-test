'use strict';

angular
  .module('lahiruoka')
  .controller('RootController', RootController);

/** @ngInject */
function RootController($scope, $state, $window, locations) {
  var vm = this;
  vm.$scope = $scope;
  vm.$state = $state;
  vm.items = locations;
}
