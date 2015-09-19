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


    // $scope.$emit('map.zoom', 10);

    $timeout(function () {
      var mbb = document.querySelector('.marker-bounding-box');
      var box = [mbb.offsetWidth, mbb.offsetHeight];
      $scope.$emit('map.setMarkerCenterOn', vm.point, box);
    },400);
    // [window.innerWidth / 2 , (window.innerWidth * 0.7) / 2];

    vm.products = products;

    vm.availableTypes = [];
  }

  LocationController.prototype.back = function () {
    var vm = this;
    vm.$state.go('root.places');
  };

})();
