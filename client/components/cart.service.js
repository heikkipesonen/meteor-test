(function () {

	function ShoppingCart () {
		var vm = this;
		vm.items = [];
	}

	ShoppingCart.prototype.hasProduct = function (product) {
		var vm = this;
		return _.find(vm.items, { product: product });
	};

	ShoppingCart.prototype.add = function (product) {
		var vm = this;
		if (vm.hasProduct(product)){

		} else {
			vm.items.push({
				count:1,
				product:product
			});
		}
	};

	angular.module('lahiruoka')
	.service('cart', ShoppingCart);
})();