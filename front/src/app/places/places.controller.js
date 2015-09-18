(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('PlacesController', PlacesController);

  /** @ngInject */
  function PlacesController($scope, $state) {
    var vm = this;

    $scope.$on('marker.click', function (evt, location) {
      $state.go('root.location', { location: location.id });
    });
  }


})();
