(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .config(config);

  /** @ngInject */
  function config($locationProvider, $urlRouterProvider) {
    // console.log($urlRouterProvider)
    $locationProvider.html5Mode(true);
  }

})();
