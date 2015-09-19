(function () {

	function ShoppingCart () {
		var vm = this;
		vm.items = [];
	}

	ShoppingCart.prototype.getCount = function (unique) {
		var vm = this;
		if (!unique){
			return vm.items.length;
		} else {
			return _.uniq(vm.items).length;
		}
	};

	ShoppingCart.prototype.hasProduct = function (product) {
		var vm = this;
		return vm.items.indexOf(product) > -1;
	};

	ShoppingCart.prototype.add = function (product) {
		var vm = this;
		vm.items.push(product);
		console.log(vm.items)
	};

	ShoppingCart.prototype.remove = function (product) {
		var vm = this;
		if (vm.hasProduct(product)){
			vm.items.splice(vm.items.indexOf(product), 1);
		}
	}

	angular.module('lahiruoka')
	.service('shoppingCart', ShoppingCart);
})();