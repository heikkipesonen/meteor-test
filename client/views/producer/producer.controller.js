(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('ProducerController', ProducerController);

  /** @ngInject */
  function ProducerController($scope, $state, $meteor, $stateParams, Producers, Products) {
    var vm = this;

    vm.model = $scope.$meteorObject(Producers, {
      _id: $stateParams._id
    }, false);

    $scope.$meteorSubscribe('producers',{_id: $stateParams._id});
    $scope.$meteorSubscribe('products', { producer_id: $stateParams._id });
    vm.products = $scope.$meteorCollection(Products, false);
  }


})();
