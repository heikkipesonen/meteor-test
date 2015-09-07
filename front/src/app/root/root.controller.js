(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('RootController', RootController);

  /** @ngInject */
  function RootController(mapService) {
    var vm = this;
    vm.mapService = mapService;
  }
})();
