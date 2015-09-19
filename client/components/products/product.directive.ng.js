(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .directive('product', productDirective);

    function productDirective () {
      return {
        restrict: 'AE',
        scope:{
          product:'=ngModel'
        },
        replace:true,
        controller: function ($scope) {

        },
        templateUrl:'client/components/products/product.ng.html'
      };
    }

})();
