angular
  .module('lahiruoka')
  .config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('root', {
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
      url: '/places/:_id',
      templateUrl: 'client/views/location/location.ng.html',
      controller: 'LocationController',
      controllerAs: 'location'
    })

    // this must be below the others
    // for the route to match 'places' and others first, and only then
    // look for producer_id
    .state('root.producer', {
      url:'/:_id',
      templateUrl: 'client/views/producer/producer.ng.html',
      controller: 'ProducerController',
      controllerAs: 'producer'
    });



  $urlRouterProvider.otherwise('/home');
}
