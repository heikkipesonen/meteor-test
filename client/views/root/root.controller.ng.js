'use strict';

angular
  .module('lahiruoka')
  .controller('RootController', RootController);

/** @ngInject */
function RootController($scope, $state, $window, Locations, $meteor) {
  var vm = this;
  vm.$scope = $scope;
  vm.$state = $state;

  $scope.$meteorSubscribe('locations');
  vm.items = $scope.$meteorCollection(Locations, false);
}
