(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        abstract: true,
        templateUrl: 'app/root/index.html',
        controller: 'RootController',
        controllerAs: 'root'
      })

      .state('root.home', {
        url: '/',
        templateUrl: 'app/main/index.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
