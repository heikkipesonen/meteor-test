(function(){
	'use strict';

	function DragViewController($scope, $element, $q, $timeout){

		this.options = {
			// how many pixels per ms should be enough to trigger view change
			changeVelocity:0.8,

			 // ratio of drag distance to width or height (dependin on the direction)
			 // until a view change is triggered
			changeDragDistance:0.3,

			// minimum distance to drag view until a change is possible
			minimumDragDistance:60,

			// multiplier to apply to drag when there is nothing
			// in the drag direction (or the opposite of it actually)
			tension:0.3,

			// animation duration when view leaves
			leaveAnimationDuration:400,
			// animation duration when view returns to its original position
			returnAnimationDuration:400,

			directions:{
				up: true,
				down: true,
				left: true,
				right: true
			}
		};

		this.$timeout = $timeout;
		this.$scope = $scope;
		// .options.directions = directionManager;


		this.el = $element[0];
		this.offset = {x:0, y:0};
		this.delta = {x:0, y:0};
		this.lastEvent = false;
		this.width = null;
		this.height = null;
		this.direction = null;
		this.timer = false;
		this.velocity = {x:0,y:0}; // current event velocity (px/ms)

		var me = this;
		// set initial values
		this.setPosition();

		// bind to events
		this.el.addEventListener('touchstart', function touchStart(evt){me.dragStart(evt);});
		this.el.addEventListener('touchmove', function touchMove(evt){me.dragMove(evt);});
		this.el.addEventListener('touchend', function touchEnd(evt){me.dragEnd(evt);});
	}

	DragViewController.prototype = {
				/**
		 * get cursor position of touch or mouse event
		 * @param  {event} evt
		 * @return {object}     {x: int, y: int}
		 */
		getCursor:function(evt){
			if (evt.touches.length > 0){
				return {x:evt.touches[0].pageX, y:evt.touches[0].pageY, timeStamp:evt.timeStamp};
			} else {
				return {x:evt.pageX, y:evt.pageY, timeStamp:evt.timeStamp};
			}
		},
		/**
		 * set element position (translate)
		 * @param {int} duration animation duration in milliseconds
		 * @return {Promise}
		 */
		setPosition:function(duration){
			// excessive ui animation
			// var scale = 1-( Math.abs( this.offset.x ) / (this.width * 10) || this.offset.x);
			// var rotation = 90*( Math.abs( this.offset.x ) / (this.width ) || this.offset.x);
			// console.log(rotation)

			this.el.style.transition = duration ? duration +'ms' : '';
			this.el.style.transform = 'translate3d('+this.offset.x+'px,'+this.offset.y+'px,0)';
			this.el.style['-webkit-transform'] = 'translate3d('+this.offset.x+'px,'+this.offset.y+'px,0)';
		},

		/**
		 * get exposed underlying side of an dragged element,
		 * the revealed side of the element under draggable, which is the opposite of
		 * drag direction
		 * @return {string} name of the side, up,down,left,right
		 */
		getExposedSide:function(){
			var d = null;
			if (this.direction === 'y'){
				d = this.delta.y > 0 ? 'up' : this.delta.y < 0 ? 'down' : null;
			} else if (this.direction === 'x'){
				d = this.delta.x > 0 ? 'left' : this.delta.x < 0 ? 'right' : null;
			}
			return d;
		},

		/**
		 * cancel timer
		 * @return {null}
		 */
		endTimer:function(){
			if (this.timer) this.$timeout.cancel(this.timer);
		},

		/**
		 * start timer for drag hold event
		 * @param  {int} delay delay in milliseconds
		 * @default 500
		 * @return {object}       promise, timer object
		 */
		startTimer:function(delay){
			var me = this;
			this.endTimer();

			this.timer = this.$timeout(function(){
				me.$scope.$emit('drag.hold.'+ me.getExposedSide() );
			}, delay || 500);

			return this.timer;
		},

		/**
		 * dragging started
		 *
		 * reset all required variables and calculate widths & heights of the draggable element
		 * @param  {mouse event} evt
		 * @return {void}
		 */
		dragStart:function(evt){
			// var style = window.getComputedStyle(this.el);
			// this.width = _.parseInt( style.width );
			// this.height = _.parseInt( style.height );
			this.width = this.el.offsetWidth;
			this.height = this.el.offsetHeight;
			this.lastEvent = this.getCursor(evt);
			this.delta.x = 0;
			this.delta.y = 0;
			this.velocity.x = 0;
			this.velocity.y = 0;
			this.direction = null;
		},
		/**
		 * on drag event
		 * @param  {mouseevent} evt
		 * @return {void}
		 */
		dragMove:function(evt){
			// get current cursor position
			var currentPosition = this.getCursor(evt);

			if (this.lastEvent){

				// step distance from last event
				var stepx = currentPosition.x - this.lastEvent.x;
				var stepy = currentPosition.y - this.lastEvent.y;

				// step velocity
				this.velocity.x = stepx / (currentPosition.timeStamp - this.lastEvent.timeStamp);
				this.velocity.y = stepy / (currentPosition.timeStamp - this.lastEvent.timeStamp);

				// current event distance
				this.delta.x += stepx;
				this.delta.y += stepy;


				//decide scroll direction after first event
				if (this.direction === null && Math.abs(this.delta.x) > Math.abs(this.delta.y)){
					this.direction = 'x';
				} else if (this.direction === null && Math.abs(this.delta.y) >= Math.abs(this.delta.x)){
					this.direction = 'y';
				}
				// when direction is clear, proceed blocking the events
				if (this.direction !== null){

					// block events if dragging occurs
					// this will disable underlying elements from gettin drag events
					evt.stopPropagation();
					evt.preventDefault();

					// if nothing can be get from the side, apply rubberband-like tension
					var tensionX = (!this.options.directions.left && stepx > 0 && this.offset.x > 0 ) || (!this.options.directions.right && stepx < 0 && this.offset.x < 0) ? this.options.tension : 1;
					var tensionY = (!this.options.directions.up && stepy > 0 && this.offset.y > 0) || (!this.options.directions.down && stepy < 0 && this.offset.y < 0) ? this.options.tension : 1;

					stepx = stepx*tensionX;
					stepy = stepy*tensionY;

					if (this.direction === 'x'){
						// detect hold event on horizontal axis
						// the page has been dragged and held (touch event does not end)
						if (stepx > 0 && this.offset.x > 0 ||  stepx < 0 && this.offset.x < 0){
							this.startTimer();
						}

						// set offset x if this.direction is horizontal
						this.offset.x += stepx;
					} else if (this.direction === 'y'){

						// detect hold event on vertical  axis
						if (stepy > 0 && this.offset.y > 0 ||  stepy < 0 && this.offset.y < 0){
							this.startTimer();
						}

						// set offset y if this.direction is vertical
						this.offset.y += stepy;
					}

					this.setPosition();
				}

				this.lastEvent = currentPosition;
			} else {
				this.dragStart(evt);
			}
		},

		setAnimationDirection: function(direction) {

		},

		go:function(direction) {

		},

	/**
		 * drag ends (mouseup, touchend)
		 * @param  {mouseevent} evt
		 * @return {void}
		 */
		dragEnd:function(){
			this.endTimer();
			this.lastEvent = false;

			// ratio of page dimensios related to drag distance
			// used for calulcating if page should be changed
			var movedRatio = {x: this.offset.x / this.width, y: this.offset.y / this.height };

			// minimum drag threshold must be overcome until change
			if (Math.abs(this.offset.x) > this.options.minimumDragDistance || Math.abs(this.offset.y) > this.options.minimumDragDistance){

				/**
				 * decide action when dragging has stopped
				 */
				if (Math.abs(movedRatio.y) > this.options.changeDragDistance || Math.abs(this.velocity.y) > this.options.changeVelocity){
					// if drag was down (moved < 0 and there is something down of here)
					if (movedRatio.y < 0 && this.options.directions.down){
						// set animation to down
						this.setAnimationDirection('down');

						// init state change
						this.go('down');

						// set element offset
						this.offset.y = -this.height;
						// animate to offset
						this.setPosition(this.options.leaveAnimationDuration);
						return;
					} else if (movedRatio.y > 0 && this.options.directions.up){ // drag was up
						this.setAnimationDirection('up');
						this.go('up');
						this.offset.y = this.height;
						this.setPosition(this.options.leaveAnimationDuration);
						return;
					}

				}

				// left and right dragging
				if (Math.abs(movedRatio.x) > this.options.changeDragDistance || Math.abs(this.velocity.x) > this.options.changeVelocity){
					if (movedRatio.x < 0 && this.options.directions.right){
						this.setAnimationDirection('forward');
						this.go('right');

						this.offset.x = -this.width;
						this.setPosition(this.options.leaveAnimationDuration);
						return;
					} else if (movedRatio.x > 0 && this.options.directions.left){
						this.setAnimationDirection('back');
						this.go('left');

						this.offset.x = this.width;
						this.setPosition(this.options.leaveAnimationDuration);
						return;
					}
				}
			}


			// reset variables (drag end)
			this.velocity.x = 0;
			this.velocity.y = 0;
			this.offset.x = 0;
			this.offset.y = 0;

			// set element position to zero (css actually overrides this to disable flickering)
			this.setPosition(this.options.returnAnimationDuration);
		}
	};


angular.module('dragview', [])

	.controller('DragViewController', DragViewController)

	.directive('dragView', function(){
		return {
			restrict:'A',
			controller:'DragViewController'
		};
	});

})();

