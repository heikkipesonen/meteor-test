(function(){

	function ProductCalculator () {

	};

	ProductCalculator.prototype.getPrice = function (product) {
		return Math.round(product.price * product.package_size * 100) / 100;
	};

	ProductCalculator.prototype.getSum = function (products) {
		var vm = this;
		var prices = _.map(products, vm.getPrice, vm);
		var total = 0;

		if (prices.length > 0){
			total = prices.reduce(function (a,b) {
				return a+b;
			});
		}

		return Math.round(total * 100)  / 100;
	};

	angular.module('lahiruoka')
	.service('productCalculator', ProductCalculator);
})();