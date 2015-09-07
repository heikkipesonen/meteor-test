(function(){

'use strict';

angular.module('scroll',[])

	/**
	 * fix native scrolling on ios and other things
	 */
	.directive('scrollY', function($timeout){
		return {
			restrict:'A',
			scope:{
				scrollY:'=' // scroll model for remembering the scroll position when view is destroyed
			},
			link:function($scope, $element){

				function getCursor(evt){
					if (evt.touches.length > 0){
						return {x:evt.touches[0].pageX,y:evt.touches[0].pageY};
					} else {
						return {x:evt.pageX,y:evt.pageY};
					}
				}

				var el = $element[0];
				var height = 0;
				var delta = {x:0, y:0};
				var lastEvent = false;
				var direction = false;

				/**
				 * wait until page has rendered first time, then check if scrollheight differs
				 */
				$timeout(function(){
					if ($scope.scrollY && $scope.scrollY.y > 0){
							el.scrollTop = $scope.scrollY.y;
					}
				});

				function easeInOutQuad(t, b, c, d){
			    t /= d/2;
			    if (t < 1) return c/2*t*t + b;
			    t--;
			    return -c/2 * (t*(t-2) - 1) + b;
				}



				// on touch start
				function onTouchStart(evt){

					height = el.offsetHeight;

					/**
					 * check if element scroll is at the top, or at the bottom,
					 * and apply 1px offset to element so ios scrolls this element instead of document body
					 * or some other element beneath
					 */
					if (height < el.scrollHeight && el.scrollTop === 0){
						el.scrollTop = 1;
					} else if (height < el.scrollHeight && el.scrollTop === el.scrollHeight - height){
						el.scrollTop = el.scrollHeight - height - 1;
					}

					evt.stopPropagation();

					direction = false;
					delta.x = 0;
					delta.y = 0;
					lastEvent = getCursor(evt);
				}

				function onTouchMove(evt){

					if (evt.touches.length > 1){
						evt.preventDefault();
						return;
					}

					var position = getCursor(evt);
							delta.x += position.x - lastEvent.x;
							delta.y += position.y - lastEvent.y;

					var isAtBottom = el.scrollTop >= el.scrollHeight - height - 1 && delta.y < 0;
					var isAtTop = el.scrollTop < 2 && delta.y > 0;

					if (direction === false){
						if (Math.abs(delta.y) > Math.abs(delta.x)){
							direction = 'y';
						} else if (Math.abs(delta.y) <= Math.abs(delta.x)){
							direction = 'x';
						}
					}

					/**
					 * if touch event is still scrolling this div
					 * block the element from propagating, otherwise let it propagate to next scrolling one
					 * in this case usually the draggable one, under scroller.
					 */
					if ( direction==='y' && !isAtTop && !isAtBottom ){
						evt.stopPropagation();
					}
				}

				// bind to element
				el.addEventListener('touchstart',onTouchStart);
				el.addEventListener('touchmove', onTouchMove);

				if ($scope.scrollY){
					el.addEventListener('scroll', function(){
						$scope.scrollY.y = el.scrollTop;
					});
				}

				$scope.$on('scroll.to', function(evt, data){
					el.scrollTop = data;
				});

				$scope.$on('scroll.toAnimated', function(evt, element){
			    var startTime = Date.now();
			    var duration = 500;
			    var fromTop = element.offsetTop - el.scrollTop;
			    var animate = function () {
			        var time = Date.now() - startTime;
			        var val = easeInOutQuad(time, fromTop, -fromTop, duration);
			        el.scrollTop = element.offsetTop - val;

			        if (time < duration) {
		            requestAnimationFrame(animate);
			        } else {
			        	el.scrollTop = element.offsetTop;
			        }
			    };

			    requestAnimationFrame(animate);
				});

				// remove when destroyed
				$scope.$on('$destroy', function(){
					el.removeEventListener('touchstart',onTouchStart);
					el.removeEventListener('touchmove', onTouchMove);
				});
			}
		};
	});

})();