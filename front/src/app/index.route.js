(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        url: '/map',
        templateUrl: 'app/root/index.html',
        controller: 'RootController',
        controllerAs: 'root'
      })

      .state('root.location', {
        url: '/:id',
        resolve:{
          location:function ($q, $stateParams, mapService) {
            var d = $q.defer();
            var marker = mapService.findMarker($stateParams.id);
            if (marker) {
              d.resolve(marker);
            } else {
              d.reject();
            }

            return d.promise;
          }
        },
        templateUrl: 'app/location/index.html',
        controller: 'LocationController',
        controllerAs: 'location'
      });

    $urlRouterProvider.otherwise('/map');
  }

})();
