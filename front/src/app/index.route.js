(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        url: '/',
        templateUrl: 'app/root/index.html',
        controller: 'RootController',
        controllerAs: 'root'
      })

      .state('root.location', {
        url: ':id',
        templateUrl: 'app/location/index.html',
        controller: 'LocationController',
        controllerAs: 'location'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
