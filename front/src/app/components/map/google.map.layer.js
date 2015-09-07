(function () {

'use strict';

angular.module('maps',[])

	.factory('MapLayer', function(mapUtils){

		/**
		 * mapLayer
		 * helper for handling multiple items on map
		 */
		function MapLayer(){
			this.map = null;
			this.items = [];
			this.visible = false;
		}

		MapLayer.prototype = {
			/**
			 * generate pseudo-id
			 * @return {string} id
			 */
			getId:function(){
			  function s4() {
			    return Math.floor((1 + Math.random()) * 0x10000)
			      .toString(16)
			      .substring(1);
			  }
			  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			    s4() + '-' + s4() + s4() + s4();
			},

			/**
			 * find marker by id
			 * @param  {string} id
			 * @return {marker}
			 */
			findMarker:function(id){
				return _.find(this.items, {id:id});
			},

			/**
			 * get layer bounds
			 * @return {google.maps.latLngBounds}
			 */
			getBounds:function(){
				return mapUtils.getBounds(this.items);
			},

			/**
			 * get map center
			 * @return {google.maps.latLng} [description]
			 */
			getCenter:function(){
				return mapUtils.getCenter(this.items);
			},

			setMap:function(map){
				this.map = map;
				this.items.forEach(function(item){
					if (item.setMap){
						item.setMap(map);
					}
				});

				return this;
			},

			addLayer:function(item){
				item.setMap(this.map);
				this.items.push(item);
				return this;
			},

			addMarker:function(options){
				var marker = new google.maps.Marker(options);
						marker.id = this.getId();
						marker.setMap(this.map);

				this.items.push( marker );
				return marker;
			},

			removeItem:function(item){
				this.items.splice(this.items.indexOf(item), 1);
				if (item.setMap){
					item.setMap(null);
				}

				return this;
			}
		};

		return MapLayer;
	});

})();