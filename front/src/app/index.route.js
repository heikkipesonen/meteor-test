(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        resolve:{
          locations:function ($http){
            return $http.get('app/locations.json').then(function(response){
              return response.data;
            });
          }
        },
        abstract:true,
        templateUrl: 'app/root/index.html',
        controller: 'RootController',
        controllerAs: 'root'
      })

      .state('root.landing', {
        url:'/home',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'landing'
      })

      .state('root.places', {
        url:'/places',
        templateUrl: 'app/places/places.html',
        controller: 'PlacesController',
        controllerAs: 'places'
      })

      .state('root.location', {
        url: '/places/:location',
        resolve:{
          location:function (locations, $q, $stateParams) {
            var d = $q.defer();
            var location = _.find(locations, {id:$stateParams.location});
            if (location) {
              d.resolve(location);
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

    $urlRouterProvider.otherwise('/home');
  }

})();
