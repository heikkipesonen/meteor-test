(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LandingController', LandingController);

  /** @ngInject */
  function LandingController($scope, $meteor, Producers) {
    var vm = this;

    $meteor.call('getRandomProducer').then(function (producer) {
      vm.producerId = producer._id;
    });
  }


})();
