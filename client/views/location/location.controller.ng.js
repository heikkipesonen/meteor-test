(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, $timeout, $state, $meteor) {
    var vm = this;
    vm.location = location;


    vm.$meteor = $meteor;
    vm.$timeout = $timeout;
    vm.$state = $state;

    // location.active.sort(function (a,b) {
    //   return a.start_datetime - b.start_datetime;
    // });

    // var now = moment();
    // var until = moment().add(100,'days');

    // vm.calendar = _.filter(location.active, function (activeTime) {
    //   var start = moment(activeTime.start_datetime);
    //   var end = moment(activeTime.end_datetime);

    //   return start.isBefore(until) && end.isAfter(now);
    // });


    // vm.selectDay(_.first(vm.calendar));

    $timeout(function () {
      var mbb = document.querySelector('.marker-bounding-box');
      var box = [mbb.offsetWidth, mbb.offsetHeight];
      $scope.$emit('map.setMarkerCenterOn', vm.location, box);
    },400);

    vm.getProducts()
  }

  LocationController.prototype.getProducts = function () {
    var vm = this;
    return vm.$meteor.subscribe('products', vm.location._id).then(function () {
      vm.products = vm.$meteor.collection(Products);
      return vm.products;
    });
  };

  LocationController.prototype.selectDay = function (day) {
    var vm = this;
    console.log(day);
    vm.selectedDay = day;
  };

  LocationController.prototype.back = function () {
    var vm = this;
    vm.$state.go('root.places');
  };

})();
