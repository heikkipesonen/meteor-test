(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, $timeout, $state, $stateParams, $meteor, Products) {
    var vm = this;

    vm.location = $scope.$meteorObject(Locations, {
      _id: $stateParams._id
    }, false);

    vm.$meteor = $meteor;
    vm.$timeout = $timeout;
    vm.$state = $state;
    vm.Products = Products;

    $timeout(function () {
      var mbb = document.querySelector('.marker-bounding-box');
      var box = [mbb.offsetWidth, mbb.offsetHeight];
      $scope.$emit('map.setMarkerCenterOn', vm.location, box);
    }, 400);

    $scope.$meteorSubscribe('products', $stateParams._id);
    vm.products = $scope.$meteorCollection(Products);
  }

  LocationController.prototype.selectDay = function (day) {
    var vm = this;
    console.log(day);
    vm.selectedDay = day;
  };

  LocationController.prototype.back = function () {
    var vm = this;
    vm.$state.go('root.places');
  };

})();
