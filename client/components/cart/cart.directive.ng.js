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
      bindToController:{
        cart:'='
      },
      templateUrl:'client/components/cart/cart.ng.html'
    };
  }



  function ShoppingCartController (productCalculator) {
    var vm = this;
    vm.productCount = 0;
    vm.total = 0;
    vm.calculator = productCalculator;
  }

  // ShoppingCartController.prototype.getList= function () {
  //   return vm.calculator.getList(vm.cart.products);
  // };


  // ShoppingCartController.prototype.getSum = function () {
  //   var vm = this;
  //   if (vm.cart){
  //     return vm.calculator.getSum(vm.cart.products);
  //   } else {
  //     return 0;
  //   }
  // };

  // ShoppingCartController.prototype.getCount = function () {
  //   var vm = this;
  //   if (vm.cart){
  //     return vm.cart.getCount();
  //   } else {
  //     return 0;
  //   }
  // };
