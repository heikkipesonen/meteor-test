(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .directive('product', productDirective);

    function productDirective () {
      return {
        restrict: 'AE',
        scope:{
          product:'=ngModel',
          exposed:'=isOpen'
        },
        replace:true,
        templateUrl:'client/components/products/product.ng.html'
      };
    }

})();
