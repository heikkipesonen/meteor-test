'use strict';

	/**
	 * store carts in service for each location
	 */
	function CartsService (Cart) {
		var vm = this;
		vm.Cart = Cart;
		vm.carts = {};
	}


	/**
	 * add new or return existing one
	 * @param {string} locationId [description]
	 */
	CartsService.prototype.addCart = function (locationId) {
		var vm = this;
		if (!vm.hasCart(locationId)){
			vm.carts[locationId] = new vm.Cart(locationId);
		}

		return vm.getCart(locationId);
	};

	/**
	 * return cart
	 * @param  {string} locationId [description]
	 * @return {cart}            [description]
	 */
	CartsService.prototype.getCart = function (locationId) {
		var vm = this;
		return vm.carts[locationId];
	};


	/**
	 * check if cart exists
	 * @param  {string}  locationId [description]
	 * @return {Boolean}            [description]
	 */
	CartsService.prototype.hasCart = function (locationId) {
		var vm = this;
		return !!vm.carts[locationId];
	};


angular.module('lahiruoka')
	.service('carts', CartsService);
