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

      .state('root.create', {
        url: '/create',
        templateUrl: 'app/main/index.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
