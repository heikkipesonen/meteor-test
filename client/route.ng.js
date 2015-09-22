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
    .state('producer', {
      url:'/tuottaja/:_id',
      abstract:true,
      templateUrl: 'client/views/producer/producer.ng.html',
      controller: 'ProducerController',
      controllerAs: 'producer'
    })

    .state('producer.info', {
      url:'',
      templateUrl: 'client/views/producer/producer/producer.view.ng.html'
    })


    .state('producer.edit', {
      url:'/edit',
      templateUrl: 'client/views/producer/products/products.ng.html',
      controller: 'EditProductsController',
      controllerAs: 'edit'
    });



  $urlRouterProvider.otherwise('/home');
}
