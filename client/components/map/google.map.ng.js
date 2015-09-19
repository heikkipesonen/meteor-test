(function () {
	var _ = lodash;
	'use strict';

	angular.module('maps')

		.provider('$googleMapConfig', function(){

			this.options = {
				disableDefaultUI:true,
				center: new google.maps.LatLng(60.162863613884376, 24.936561584472656),
				zoom:8,
				minZoom:4,
				// styles:[{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'poi.government','elementType':'labels.text.fill','stylers':[{'color':'#b43b3b'}]},{'featureType':'poi.park','elementType':'geometry.fill','stylers':[{'hue':'#ff0000'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road','elementType':'geometry.fill','stylers':[{'lightness':'8'},{'color':'#bcbec0'}]},{'featureType':'road','elementType':'labels.text.fill','stylers':[{'color':'#5b5b5b'}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#7cb3c9'},{'visibility':'on'}]},{'featureType':'water','elementType':'geometry.fill','stylers':[{'color':'#abb9c0'}]},{'featureType':'water','elementType':'labels.text','stylers':[{'color':'#fff1f1'},{'visibility':'off'}]}]
				mapTypeId:'toner',
				mapTypeControlOptions:{
					mapTypeIds: ['toner']
				}
			};

			this.$get = function(){
				return this.options;
			};
		})


		.service('mapMarkers', function ($rootScope){
			var vm = this;
			vm.markers = [];
			vm.map = null;

			/**
			 * set map of all items
			 * @param {[type]} map [description]
			 */
			vm.setMap = function (map) {
				vm.map = map;
				vm.markers.forEach(function (marker) {
					marker.setMap(map);
				});
			};

			/**
			 * create new markers from an location object
			 * @param {object} location [description]
			 */
			vm.addMarkerFromLocation = function (location) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(location.latitude, location.longitude),
					icon: 'images/marker-' + location.type + '.png',
					data:location
				});

				return vm.addMarker(marker);
			};


			/**
			 * push new marker to collection
			 * @param {[type]} marker [description]
			 */
			vm.addMarker = function (marker) {
				vm.markers.push(marker);
				marker.setMap(vm.map);

				google.maps.event.addListener(marker, 'click', function (evt) {
						vm.markerClick(marker.data);
				});

				return marker;
			};


			/**
			 * on marker click something should happen
			 * @param  {[type]} data [description]
			 * @return {[type]}      [description]
			 */
			vm.markerClick = function (data) {
				$rootScope.$broadcast('marker.click', data);
			};


			/**
			 * find marker by location._id
			 * @param  {[type]} location [description]
			 * @return {[type]}          [description]
			 */
			vm.findMarkerByLocation = function (location) {
				return _.find(vm.markers, 'data._id', location._id);
			};

			/**
			 * remove marker from view by location._id
			 * @param  {[type]} location [description]
			 * @return {[type]}          [description]
			 */
			vm.removeMarkerByLocation = function (location) {
				var marker = vm.findMarkerByLocation(location);
				return vm.removeMarker(marker);
			};


			/**
			 * remove marker from collection (and map)
			 * @param  {[type]} marker [description]
			 * @return {[type]}        [description]
			 */
			vm.removeMarker = function (marker) {
				if (marker){
					vm.markers.splice(vm.markers.indexOf(marker),1);
					marker.setMap(null);
				} else {
					console.error('tried to remove non existing marker', location);
				}
				return marker;
			};



			/**
			 * compare dataset to existing set of thigns
			 * and remvove those that are removed and add new ones
			 * @param  {[type]} markers [description]
			 * @return {[type]}         [description]
			 */
			vm.updateDataset = function (markers) {
				var added = _.filter(markers, function (l) {
					return !_.find(vm.markers, 'data._id', l._id);
				});

				var removed = _.filter(vm.markers, function (m) {
					return !_.find(markers, '_id', m.data._id);
				});

				if (added.length || removed.length){
					added.forEach(vm.addMarkerFromLocation);
					removed.forEach(vm.removeMarkerByLocation);
				}
			}
		})

		.directive('googleMap', function($googleMapConfig, mapUtils, $rootScope, $q, mapMarkers){
			return {
				scope:{
					locations:'=ngModel'
				},
				restrict:'AE',
				link:function($scope, $element){

					var map  = new google.maps.Map($element[0], $googleMapConfig);
					map.mapTypes.set('toner', new google.maps.StamenMapType('toner'));
					mapMarkers.setMap(map);

					var readyListener = $q.defer();
					var ready = readyListener.promise;


					var showMarker = function (evt, location) {
						ready.then(function(){
							var marker = findMarker(location);
							var markerPosition = mapUtils.getPixelPosition(marker.position, marker.map);
							var position = [markerPosition[0], markerPosition[1]];
							var headerCenter = [window.innerWidth / 2 , (window.innerWidth * 0.7) / 2];

							map.panBy(position[0] - headerCenter[0], position[1] - headerCenter[1]);
						});
					};

					var setMarkerCenterOn = function (evt, location, boundingbox) {
						ready.then(function(){
							var marker = findMarker(location);
							var markerPosition = mapUtils.getPixelPosition(marker.position, marker.map);
							var position = [markerPosition[0], markerPosition[1]];
							var headerCenter = [boundingbox[0] / 2 , boundingbox[1] / 2];
							map.panBy(position[0] - headerCenter[0], position[1] - headerCenter[1]);
						});
					};

					var getZoom = function (){
						return ready.then(function () {
							return map.getZoom();
						});
					}

					var setZoom = function (evt, data) {
						ready.then(function () {
							map.setZoom(data);
						});
					}

					google.maps.event.addListenerOnce(map, 'idle', function() {
						console.info('map.ready');
						readyListener.resolve();
					});

					// google.maps.event.addListener(map, 'click', function (evt) {
					// 	$scope.$emit('map.click', evt);
					// });

					// google.maps.event.addListener(map, 'rightclick', function (evt) {
					// 	$scope.$emit('map.click', evt);
					// });

					$rootScope.$on('map.setMarkerCenterOn', setMarkerCenterOn);
					$rootScope.$on('map.center', showMarker);
					$rootScope.$on('map.zoom', setZoom);

					$scope.$watch(function () {
						return $scope.locations;
					}, mapMarkers.updateDataset, true);




					console.log('init: map');
				}
			};
		});

})();
