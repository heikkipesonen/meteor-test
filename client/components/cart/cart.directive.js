(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .directive('shoppingCart', shoppingCartDirective);

    function shoppingCartDirective () {
      return {
        replace:true,
        restrict: 'AE',
        controller:ShoppingCartController,
        controllerAs:'cart',
        scope:{},
        templateUrl:'client/components/cart/cart.ng.html'
      };
    }



    function ShoppingCartController (shoppingCart, productCalculator) {
      var vm = this;
      vm.productCount = 0;
      vm.total = 0;
      vm.cart = shoppingCart;
      vm.calculator = productCalculator;
    }


    ShoppingCartController.prototype.getSum = function () {
      var vm = this;
      return vm.calculator.getSum(vm.cart.items);
    };

    ShoppingCartController.prototype.getCount = function () {
      var vm = this;
      return vm.cart.getCount();
    };

})();
