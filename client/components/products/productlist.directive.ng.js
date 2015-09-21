'use strict';


function ProductListController (productCalculator) {
	var vm = this;
	vm.exposedProduct = null;
	vm.calculator = productCalculator;
}

ProductListController.prototype.exposeProduct = function (product) {
	var vm = this;
	if (vm.isExposed(product)){
		vm.exposedProduct = null;
	} else {
		vm.exposedProduct = product;
	}
};

ProductListController.prototype.addToCart = function (product) {
	var vm = this;
	if (vm.cart){
		vm.cart.add(product);
	}
};

ProductListController.prototype.removeFromCart = function (product) {
	var vm = this;
	if (vm.cart){
		vm.cart.remove(product);
	}
};

ProductListController.prototype.isExposed = function (product) {
	var vm = this;
	return product === vm.exposedProduct;
};

angular.module('lahiruoka')
	.directive('productList', function () {
		return {
			replace:true,
			restrict: 'AE',
			scope:{},
			bindToController:{
				list:'=ngModel',
				cart:'='
			},
			controller:ProductListController,
			controllerAs: 'productList',
			templateUrl: 'client/components/products/productlist.ng.html'
		};
	});
