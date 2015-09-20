(function () {
	'use strict';


	/**
	 * includes some sketchy things, options extending and so on
	 * because no isolated scope cannot be created from this
	 *
	 * @param {[type]} $scope   [description]
	 * @param {[type]} $element [description]
	 * @param {[type]} $attrs   [description]
	 * @param {[type]} $q       [description]
	 * @param {[type]} $timeout [description]
	 */
	function DragViewController($scope, $element, $attrs, $q, $timeout){
		var vm = this;
		vm.defaultOptions = {
			// how many pixels per ms should be enough to trigger view change
			changeVelocity:0.1,

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

			offset:{
				x: 0,
				y: 0
			},

			axis:{
				x:{
					min: 0,
					max: 0,
					tension: true
				},
				y:{
					min:0,
					max:0,
					tension: true
				}
			}
		};

		vm.$timeout = $timeout;
		vm.$scope = $scope;
		vm.$scope.$dragView = vm;

		// very sketchy hax
		vm.options = _.defaults(vm.$scope.dragViewOptions || {}, vm.defaultOptions);
		// .options.directions = directionManager;

		vm.el = $element[0];
		// vm.options.offset = { x:0, y:0 };
		vm.delta = { x:0, y:0 };
		vm.lastEvent = false;
		// vm.width = null;
		// vm.height = null;
		vm.direction = null;
		vm.timer = false;
		vm.velocity = { x:0,y:0 }; // current event velocity (px/ms)



		// set initial values
		vm.setPosition();

		// bind to events
		vm.el.addEventListener('touchstart', function touchStart(evt){vm.dragStart(evt);});
		vm.el.addEventListener('touchmove', function touchMove(evt){vm.dragMove(evt);});
		vm.el.addEventListener('touchend', function touchEnd(evt){vm.dragEnd(evt);});
	}

	DragViewController.prototype = {
		/**
		 * get cursor position of touch or mouse event
		 * @param  {event} evt
		 * @return {object}     {x: int, y: int}
		 */
		getCursor:function (evt) {
			if (evt.touches.length > 0){
				return { x:evt.touches[0].pageX, y:evt.touches[0].pageY, timeStamp:evt.timeStamp };
			} else {
				return { x:evt.pageX, y:evt.pageY, timeStamp:evt.timeStamp };
			}
		},
		/**
		 * set element position (translate)
		 * @param {int} duration animation duration in milliseconds
		 * @return {Promise}
		 */
		setPosition:function (duration) {
			var vm = this;
			vm.el.style.transition = duration ? duration +'ms' : '0ms';
			vm.el.style.transform = 'translate3d('+vm.options.offset.x+'px,'+vm.options.offset.y+'px,0)';
			vm.el.style['-webkit-transform'] = 'translate3d('+vm.options.offset.x+'px,'+vm.options.offset.y+'px,0)';
		},

		/**
		 * get exposed underlying side of an dragged element,
		 * the revealed side of the element under draggable, which is the opposite of
		 * drag direction
		 * @return {string} name of the side, up,down,left,right
		 */
		getExposedSide:function () {
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
		endTimer:function () {
			if (this.timer) this.$timeout.cancel(this.timer);
		},

		/**
		 * start timer for drag hold event
		 * @param  {int} delay delay in milliseconds
		 * @default 500
		 * @return {object}       promise, timer object
		 */
		startTimer:function (delay) {
			var me = this;
			this.endTimer();

			this.timer = this.$timeout(function () {
				me.$scope.$emit('drag.hold.'+ me.getExposedSide());
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
		dragStart:function (evt) {
			// var style = window.getComputedStyle(this.el);
			// this.width = _.parseInt( style.width );
			// this.height = _.parseInt( style.height );
			// this.width = this.el.offsetWidth;
			// this.height = this.el.offsetHeight;
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
		dragMove:function (evt) {
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

					// movementMultiplier = amount of tension or stop moving if axis is disabled
					var movementMultiplierX = this.options.axis.x ? 1 : 0;
					var movementMultiplierY = this.options.axis.y ? 1 : 0;

					// if axis x is enabled, and things happen
					// apply tension
					//
					// otherwise move as requested
					if (this.options.axis.x){
						if (this.options.offset.x <= this.options.axis.x.min || this.options.offset.x >= this.options.axis.x.max){
							movementMultiplierX = this.options.axis.x.tension ? this.options.tension : 0;
						}
					}

					if (this.options.axis.y){
						if (this.options.offset.y <= this.options.axis.y.min || this.options.offset.y >= this.options.axis.y.max){
							movementMultiplierY = this.options.axis.y.tension ? this.options.tension : 0;
						}
					}

					// apply multiplier
					stepx = stepx*movementMultiplierX;
					stepy = stepy*movementMultiplierY;

					if (this.direction === 'x'){
						// detect hold event on horizontal axis
						// the page has been dragged and held (touch event does not end)
						if (stepx > 0 && this.options.offset.x > 0 ||  stepx < 0 && this.options.offset.x < 0){
							this.startTimer();
						}

						// set offset x if this.direction is horizontal
						this.options.offset.x += stepx;
					} else if (this.direction === 'y'){

						// detect hold event on vertical  axis
						if (stepy > 0 && this.options.offset.y > 0 ||  stepy < 0 && this.options.offset.y < 0){
							this.startTimer();
						}

						// set offset y if this.direction is vertical
						this.options.offset.y += stepy;
					}

					this.setPosition();
				}

				this.lastEvent = currentPosition;
			} else {
				this.dragStart(evt);
			}
		},

		/**
			 * drag ends (mouseup, touchend)
			 * @param  {mouseevent} evt
			 * @return {void}
			 */
		dragEnd:function () {
			this.endTimer();
			this.lastEvent = false;



			var currentOffsetY = this.options.offset.y;
			var currentOffsetX = this.options.offset.x;

			// which position is closes to current?
			var diffToYMin = Math.abs(this.options.axis.y.min - this.options.offset.y);
			var diffToYMax = Math.abs(this.options.axis.y.max - this.options.offset.y);

			var diffToXMin = Math.abs(this.options.axis.x.min - this.options.offset.x);
			var diffToXMax = Math.abs(this.options.axis.x.max - this.options.offset.x);

			var offsetY = this.options.axis.y ? diffToYMin < diffToYMax ? this.options.axis.y.min : this.options.axis.y.max : 0;
			var offsetX = this.options.axis.x ? diffToXMin < diffToXMax ? this.options.axis.x.min : this.options.axis.x.max : 0;

			// if change should be triggered anyway?
			// ie moved to min / max position
			// changevelocity exceeded
			if (this.options.axis.y && Math.abs(this.velocity.y) > this.options.changeVelocity){
				offsetY = this.velocity.y < 0 ? this.options.axis.y.min : this.options.axis.y.max;
			}

			if (this.options.axis.x && Math.abs(this.velocity.x) > this.options.changeVelocity){
				offsetX = this.velocity.x < 0 ? this.options.axis.x.min : this.options.axis.x.max;
			}


			this.options.offset.x = offsetX;
			this.options.offset.y = offsetY;


			// reset variables (drag end)
			this.velocity.x = 0;
			this.velocity.y = 0;
			// this.options.offset.x = 0;
			// this.options.offset.y = 0;

			// set element position to zero (css actually overrides this to disable flickering)
			this.setPosition(this.options.returnAnimationDuration);
		}
	};


	angular.module('dragview', [])

		.controller('DragViewController', DragViewController)

	.directive('dragView', function () {
		return {
			restrict:'A',
			controller:'DragViewController'
		};
	});

})();

