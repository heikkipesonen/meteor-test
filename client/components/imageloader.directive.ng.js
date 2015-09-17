(function(){
	'use strict';

	angular
		.module('imageUtils', [])
		.directive('imageLoader', function(){
			return {
				restrict:'AE',
				scope:{
					imageLoader:'='
				},
				link:function($scope, $element, $attrs){

					function setImage(){
						$element.removeClass('image-ready').addClass('image-loading');
						var img = new Image();
						img.onload = function(){
							if ($attrs.autosize){
								var aspect = img.height / img.width;

								$element.css({
									'height' : 0,
									'padding-bottom' : aspect*100 + '%'
								});
							}

							if ($element[0].nodeName === 'IMG'){
								$element[0].src = img.src;
							} else {
								$element.css('background-image','url('+img.src+')');
							}

							$element.removeClass('image-loading')
											.addClass('image-ready');
						};

						img.src = $scope.imageLoader.url ? $scope.imageLoader.url : $scope.imageLoader;
					}

					$scope.$watch('imageLoader', function(){
						if ($scope.imageLoader && $scope.imageLoader !== ''){
							setImage();
						}
					});
				}
			};
		});

})();