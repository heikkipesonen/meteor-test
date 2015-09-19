(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .controller('LocationController', LocationController);

  /** @ngInject */
  function LocationController($scope, location, $timeout, $state, products) {
    var vm = this;
    vm.point = location;

    vm.$timeout = $timeout;
    vm.$state = $state;

    location.active.sort(function (a,b) {
      return a.start_datetime - b.start_datetime;
    });

    var now = moment();
    var until = moment().add(100,'days');

    vm.calendar = _.filter(location.active, function (activeTime) {
      var start = moment(activeTime.start_datetime);
      var end = moment(activeTime.end_datetime);
      console.log(start.isBefore(until), end.isAfter(now));
      return start.isBefore(until) && end.isAfter(now);
    });

    console.log(vm.calendar);
    vm.selectDay(_.first(vm.calendar));

    // $scope.$emit('map.zoom', 10);

    $timeout(function () {
      var mbb = document.querySelector('.marker-bounding-box');
      var box = [mbb.offsetWidth, mbb.offsetHeight];
      $scope.$emit('map.setMarkerCenterOn', vm.point, box);
    },400);
    // [window.innerWidth / 2 , (window.innerWidth * 0.7) / 2];

    vm.products = products;

    vm.availableTypes = [];
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
