/**
 * unisex calculator for calculating product values across
 * the application
 */

function ProductCalculator () {}


/**
 * make shoppingcart list out of array of products
 * @param  {array} productsList [description]
 * @return {array}              [description]
 */
ProductCalculator.prototype.getList = function (productsList) {
	var vm = this;
	var products = _.groupBy(productsList, '_id');

	return _.map(products, function (productSet, id) {
		var model = angular.extend({}, _.first(productSet));
		model._sum = vm.getSum(productSet);
		model._count = productSet.length;
		model._unit_cost = vm.getPrice(model);
		return model;
	});
};

/**
 * get single product price
 * @param  {[type]} product [description]
 * @return {[type]}         [description]
 */
ProductCalculator.prototype.getPrice = function (product) {
	return Math.round(product.price * product.package_size * 100) / 100;
};

/**
 * get sum from a list of products
 * @param  {[type]} products [description]
 * @return {[type]}          [description]
 */
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
