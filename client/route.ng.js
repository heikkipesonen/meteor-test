angular
  .module('lahiruoka')
  .config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('root', {
      resolve:{
        subscribe: function ($meteor) {
          return $meteor.subscribe('locations');
        }
      },
      url: '/map',
      templateUrl: 'client/views/root/root.ng.html',
      controller: 'RootController',
      controllerAs: 'root'
    })

    .state('testi', {
      url: '/testi',
      templateUrl: 'client/views/testi/testi.ng.html'
    })

    .state('root.location', {
      url: '/:id',
      resolve:{
        location: function (locations, $q, $stateParams) {
          var d = $q.defer();
          var marker = _.find(locations, {_id:$stateParams.id});
          if (marker) {
            d.resolve(marker);
          } else {
            d.reject();
          }

          return d.promise;
        }
      },
      templateUrl: 'client/views/location/location.ng.html',
      controller: 'LocationController',
      controllerAs: 'location'
    });

  $urlRouterProvider.otherwise('/map');
}
