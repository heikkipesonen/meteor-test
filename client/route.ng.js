var _ = lodash;

angular
  .module('lahiruoka')
  .config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('testi', {
      url: '/testi',
      templateUrl: 'client/views/testi/testi.ng.html'
    })

    .state('root', {
      resolve: {
        locations: function ($q, $meteor) {
          return $meteor.subscribe('locations').then(function () {
            return $meteor.collection(Locations);
          });
        }
      },
      abstract: true,
      templateUrl: 'client/views/root/root.ng.html',
      controller: 'RootController',
      controllerAs: 'root'
    })

    .state('root.landing', {
      url:'/home',
      templateUrl: 'client/views/landing/landing.ng.html',
      controller: 'LandingController',
      controllerAs: 'landing'
    })

    .state('root.places', {
      url:'/places',
      templateUrl: 'client/views/places/places.ng.html',
      controller: 'PlacesController',
      controllerAs: 'places'
    })

    .state('root.location', {
      url: '/places/:location',
      resolve:{
        location: function (locations, $q, $stateParams) {
          var location = _.find(locations, '_id', $stateParams.location);
          if (location) {
            return location;
          } else {
            throw 'Location not found';
          }
        }
      },
      templateUrl: 'client/views/location/location.ng.html',
      controller: 'LocationController',
      controllerAs: 'location'
    });

  $urlRouterProvider.otherwise('/home');
}
