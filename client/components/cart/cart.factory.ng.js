'use strict';

angular.module('lahiruoka')
.factory('Cart', function (productCalculator) {
	/**
	 * shopping cart
	 * for storing items in an object
	 * @param {[type]} locationId [description]
	 */
	function ShoppingCart (locationId) {
		var vm = this;
		vm.locationId = locationId;
		vm.products = [];
		vm.calculator = productCalculator;
		vm.list = [];
	}

	ShoppingCart.prototype.getList = function () {
		var vm = this;
		vm.list =  vm.calculator.getList(vm.products);
		return vm.list;
	};

	ShoppingCart.prototype.getSum = function () {
		var vm = this;
		return vm.calculator.getSum(vm.products);
	};

	/**
	 * count all products
	 * @param  {boolean} unique calculate only unique products
	 * @return {[type]}        [description]
	 */
	ShoppingCart.prototype.getCount = function (unique) {
		var vm = this;
		if (!unique){
			return vm.products.length;
		} else {
			return _.uniq(vm.products).length;
		}
	};

	/**
	 * check if a product is added
	 * @param  {[type]}  product [description]
	 * @return {Boolean}         [description]
	 */
	ShoppingCart.prototype.hasProduct = function (product) {
		var vm = this;
		return vm.products.indexOf(product) > -1;
	};


	/**
	 * add product
	 * @param {[type]} product [description]
	 */
	ShoppingCart.prototype.add = function (product) {
		var vm = this;
		vm.products.push(product);
		vm.getList();
	};


	/**
	 * remove product
	 * @param  {[type]} product [description]
	 * @return {[type]}         [description]
	 */
	ShoppingCart.prototype.remove = function (product) {
		var vm = this;
		if (vm.hasProduct(product)){
			vm.products.splice(vm.products.indexOf(product), 1);
			vm.getList();
		}
	}


	return ShoppingCart;
});
