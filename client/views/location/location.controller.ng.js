(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  function LocationController($scope, $timeout, $state, $stateParams, $meteor, Products, carts) {
    var vm = this;

    vm.location = $scope.$meteorObject(Locations, {
      _id: $stateParams._id
    }, false);

    vm.$meteor = $meteor;
    vm.$timeout = $timeout;
    vm.$state = $state;
    vm.cart = carts.addCart($stateParams._id);

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
    }, 400);

    $scope.$meteorSubscribe('products', $stateParams._id);
    vm.products = $scope.$meteorCollection(Products);
  }

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
