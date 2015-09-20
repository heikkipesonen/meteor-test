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



  function ShoppingCartController ($scope, productCalculator, $timeout) {
    var vm = this;
    vm.productCount = 0;
    vm.total = 0;
    vm.calculator = productCalculator;
    vm.$scope = $scope;

    // drag view options for cart content
    vm.$scope.dragViewOptions = {
      axis:{
        x:false,
        y:{
          min: -(window.innerHeight-84),
          max:0,
          tension:true
        }
      }
    };
  }

  /**
   * open shoppingcart as full view
   */
  ShoppingCartController.prototype.setOpen = function () {
    var vm = this;
    vm.$scope.$dragView.options.offset.y = vm.$scope.dragViewOptions.axis.y.min;
    vm.$scope.$dragView.setPosition(vm.$scope.dragViewOptions.returnAnimationDuration);
  };

  /**
   * close the thing
   */
  ShoppingCartController.prototype.setClosed = function () {
    var vm = this;
    vm.$scope.$dragView.options.offset.y = vm.$scope.dragViewOptions.axis.y.max;
    vm.$scope.$dragView.setPosition(vm.$scope.dragViewOptions.returnAnimationDuration);
  };

  /**
   * toggle thing
   * @return {[type]} [description]
   */
  ShoppingCartController.prototype.toggleOpen = function () {
    var vm = this;
    if (vm.$scope.dragViewOptions.offset.y === vm.$scope.dragViewOptions.axis.y.min){
      vm.setClosed();
    } else {
      vm.setOpen();
    }
  };

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
