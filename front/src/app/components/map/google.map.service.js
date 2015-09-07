(function () {

	'use strict';

	angular.module('maps')

		.service('mapService', function(MapLayer, mapUtils){
			var layer = new MapLayer();

			angular.extend(layer,{
				initialized:false,

				listeners:[],

				init:function(){

				},

				setMap:function(map){
					this.map = map;
					this.items.forEach(function(item){
						item.setMap(map);
					});

					return this;
				},

				getCenter:function(){
					return this.map.getCenter();
				},

				getMapBounds:function(){
					return mapUtils.toPointBounds( this.map.getBounds() );
				},

				panTo:function(point){
					this.map.panTo( mapUtils.toLatLng(point) );
					return this;
				},

				on:function(eventName, callback){
					var e = mapUtils.on(eventName, this.map, callback);
							e._type = eventName;

					this.listeners.push(e);
					return e;
				},

				off:function(eventName){
					_.forEach( _.filter(this.listeners, {_type:eventName}) , function(eventListener){
						eventListener.remove();
					});
				},

				getPixelPosition:function(point){
					return mapUtils.getPixelPosition(point, this.map);
				}
			});

			return layer;
		});

})();