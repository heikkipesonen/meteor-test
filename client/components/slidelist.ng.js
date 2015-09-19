(function(){

'use strict';

angular.module('slidelist', [])

	/**
	 * make list of items slidable to a specified direction
	 * <div slide-list>
	 * 	<div slie-item="x"></div> <!-- item slidable on x -->
	 * 	<div slie-item="y"></div> <!-- item slidable on y -->
	 * </div>
	 *
	 * sliding direction is checked on touchstart
	 *
	 *
	 * this binds listeners to slide-list element and when some of its children is touched,
	 * touch should propagate to this element, and the target element should be at evt.srcElement (source of touch event)
	 * which must have slide-item="axis" defined for drag to occur.
	 *
	 * when drag starts, and first touchmove event is received, the drag direction is decided against difference between these
	 * two cordinates (lastEvent.x  && currentEvent.x, and lastEvent.y  && currentEvent.y), if diff between x axis points
	 * is greater than diff between y events, the drag is considered to be horizontal and only x-axis drag is counted until touchend.
	 * otherwise if y-axis difference is bigger, then the drag is probably vertical, until touch is released.
	 *
	 * when element is then dragged, it is translated (2d) to a position according to the drag event distance,
	 * when touch is released, the element will be animated back to 0,0 position.
	 *
	 * during dragging evt propagation is stopped and default prevented
	 */
	.directive('slideList', function(){
		return {
			restrict:'A',
			link:function($scope, $element){
				var el = $element[0];
				var lastEvent = false;
				var currentElement = false;
				var delta = {x:0,y:0};
				var offset = {x:0, y:0};
				var width = 0;
				var direction = false;
				var slideDirection  = null;

				/**
				 * get cursor position of touch or mouse event
				 * @param  {event} evt
				 * @return {object}     {x: int, y: int}
				 */
				function getCursor(evt){
					if (evt.touches.length > 0){
						return {x:evt.touches[0].pageX, y:evt.touches[0].pageY, timeStamp:evt.timeStamp};
					} else {
						return {x:evt.pageX, y:evt.pageY, timeStamp:evt.timeStamp};
					}
				}
				/**
				 * set element position on dom
				 * @param {int} duration animation duration in milliseconds, defaults to 0
				 */
				function setPosition(duration){
					// if we actually have an valid draggable element specified
					if (currentElement){
						currentElement.style.transform = 'translate3d('+offset.x+'px,'+offset.y+'px, 0)';
						currentElement.style['-webkit-transform'] = 'translate3d('+offset.x+'px,'+offset.y+'px,0)';
						currentElement.style.transition = (duration || 0) + 'ms';
					}
				}


				/**
				 * listen touchevents on slide-list element
				 * reset all required variables and set event position as last event
				 * @param  {event} evt
				 */
				function touchStart(evt){

					// get slide-item attribute value
					slideDirection = evt.srcElement.getAttribute('slide-item');
console.log(slideDirection)
					// if direction is defined, element is draggable and we can proceed
					if (slideDirection !== null){
						// element to drag with current event
						currentElement = evt.srcElement;

						// reset event delta
						delta.x = 0;
						delta.y = 0;

						// reset element position
						offset.x = 0;
						offset.y = 0;

						// lastevent, to calculate drag distance
						lastEvent = getCursor(evt);

						// element width, to calculate ratio of drag distance compared to the dragged element
						width = el.offsetWidth;
						direction = false;
					}
				}


				/**
				 * on touch move, we calculate position, direction and apply transforms if requirements are met
				 * @param  {event} evt touchvent
				 */
				function touchMove(evt){
					// if event has started on some element and we have valid drag element
					if (lastEvent && currentElement){

						// current pointer position
						var currentPosition = getCursor(evt);

						// step distance
						var sx = currentPosition.x - lastEvent.x;
						var sy = currentPosition.y - lastEvent.y;

						// event delta
						delta.x += sx;
						delta.y += sy;

						// if direction is not already decided, we check which axis it is
						if (direction === false){
							// drag is vertical if absolute values of delta.x is greater than delta.y
							if (lastEvent && Math.abs(delta.x) > Math.abs(delta.y)){
								direction = 'x';
							} else if (lastEvent && Math.abs(delta.x) < Math.abs(delta.y)){ // if the other way around
								direction = 'y';
							}
						}


						// if we have decided direction, then we can proceed to translate the element
						if (direction === slideDirection) {

							evt.stopPropagation();
							evt.preventDefault();

							// limit element to follow only one axis
							offset.x = direction === 'x' ? offset.x += sx : offset.x;
							offset.y = direction === 'y' ? offset.y += sy : offset.y;

							setPosition();
							lastEvent = currentPosition;
						}
					}
				}


				/**
				 * touch release
				 * reset events and return element to its 0 position with an animation
				 */
				function touchEnd(){
					var movedRatio = offset.x / width;

					lastEvent = false;
					offset.x = 0;
					offset.y = 0;


					setPosition(300);
				}

				el.addEventListener('touchstart', touchStart);
				el.addEventListener('touchmove', touchMove);
				el.addEventListener('touchend', touchEnd);
			}
		};
	});
})();