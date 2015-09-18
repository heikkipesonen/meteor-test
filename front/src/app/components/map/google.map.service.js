(function  () {

	'use strict';

	angular.module('maps')

		.service('mapService', function (MapLayer, mapUtils, $q) {
			var layer = new MapLayer();
			var ready = $q.defer();

			angular.extend(layer,{

				ready: ready.promise,

				setReady: function(){
					ready.resolve(this.map);
				},

				listeners: [],

				addMarker:function(options){
					var marker = new google.maps.Marker(options);
							marker.id = options.id ||this.getId();
							marker.setMap(this.map);


					this.items.push( marker );
					return marker;
				},

				setMap: function (map) {
					this.map = map;
					this.items.forEach(function (item) {
						item.setMap(map);
					});
					return this;
				},

				getCenter: function () {
					return this.map ? mapUtils.toPoint(this.map.getCenter()) : [0,0];
				},

				getMapBounds: function () {
					return this.map ? mapUtils.toPointBounds( this.map.getBounds() ) : [[0,0],[0,0]];
				},

				panTo: function (point) {
					if (this.map){
						this.map.panTo( mapUtils.toLatLng(point) );
					}

					return this;
				},

				on: function (eventName, callback) {
					var e = mapUtils.on(eventName, this.map, callback);
							e._type = eventName;

					this.listeners.push(e);
					return e;
				},

				off: function (eventName) {
					_.forEach( _.filter(this.listeners, {_type: eventName}) , function (eventListener) {
						eventListener.remove();
					});
				},

				getPixelPosition: function (point) {
					return mapUtils.getPixelPosition(point, this.map);
				}
			});

			return layer;
		});

})();