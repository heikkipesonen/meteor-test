'use strict';


function EditableProductListController ($scope, productCalculator, Categories) {
	var vm = this;
	vm.exposedProduct = null;
	vm.calculator = productCalculator;
	vm.columns = ['name','unit', 'price','package_size'];

  $scope.$meteorSubscribe('categories');
  vm.categories = $scope.$meteorCollection(Categories);

}

EditableProductListController.prototype.exposeProduct = function (product) {
	var vm = this;
	if (vm.isExposed(product)){
		vm.exposedProduct = null;
	} else {
		vm.exposedProduct = product;
	}
};

EditableProductListController.prototype.isExposed = function (product) {
	var vm = this;
	return product === vm.exposedProduct;
};

angular.module('lahiruoka')
	.directive('editableProductList', function () {
		return {
			replace:true,
			restrict: 'AE',
			scope:{},
			bindToController:{
				list:'=ngModel',
			},
			controller:EditableProductListController,
			controllerAs: 'productList',
			templateUrl: 'client/components/products/productlist.editable.ng.html'
		};
	});
