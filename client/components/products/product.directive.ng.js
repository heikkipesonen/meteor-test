(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .directive('product', productDirective);

    function productDirective () {
      return {
        restrict: 'AE',
        scope:{
          product:'=ngModel'
        },
        replace:true,
        template:
        '<div class="product">'+
          '<div class="product-info">'+
            '<h3 class="product-price">'+
              '<span class="price" ng-bind="product.price + \'€\'"></span>'+
              '<span class="unit" ng-bind="\'/\'+product.unit"></span>'+
            '</h3>'+
            '<h4 class="product-available" ng-bind="product.available"></h4>'+
          '</div>'+
          '<div class="product-content">'+
            '<h3 class="product-title" ng-bind="product.name"></h3>'+
            '<h4 class="product-type" ng-bind="product.type"></h4>'+
            '<p class="product-description" ng-bind="product.description"></p>'+

            '<p class="product-manufacturer" ng-bind="product.company"></p>'+
          '</div>'+
        '</div>'
      };
    }

})();
