(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .config(config);

  /** @ngInject */
  function config($locationProvider) {
    $locationProvider.html5Mode(true);
  }

})();
