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
				styles:[{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'poi.government','elementType':'labels.text.fill','stylers':[{'color':'#b43b3b'}]},{'featureType':'poi.park','elementType':'geometry.fill','stylers':[{'hue':'#ff0000'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road','elementType':'geometry.fill','stylers':[{'lightness':'8'},{'color':'#bcbec0'}]},{'featureType':'road','elementType':'labels.text.fill','stylers':[{'color':'#5b5b5b'}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#7cb3c9'},{'visibility':'on'}]},{'featureType':'water','elementType':'geometry.fill','stylers':[{'color':'#abb9c0'}]},{'featureType':'water','elementType':'labels.text','stylers':[{'color':'#fff1f1'},{'visibility':'off'}]}]
			};

			this.$get = function(){
				return this.options;
			};
		})


		.directive('googleMap', function($googleMapConfig, mapUtils, $rootScope, $q){
			return {
				scope:{
					locations:'=ngModel'
				},
				restrict:'AE',
				link:function($scope, $element){

					// very nice hax
					var layer = 'toner';
					$googleMapConfig.mapTypeId = layer
					$googleMapConfig.mapTypeControlOptions = {
						mapTypeIds: [layer]
					};


					var map  = new google.maps.Map($element[0], $googleMapConfig);
					map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
					var markers = [];
					var readyListener = $q.defer();
					var ready = readyListener.promise;

					var markerClick = function (location) {
						$rootScope.$broadcast('marker.click', location);
					};

					var addMarker = function (location) {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(location.latitude, location.longitude),
							icon: 'images/marker-' + location.type + '.png',
							data:location
						});

						google.maps.event.addListener(marker, 'click', function (evt) {
							markerClick(marker.data);
						});

						marker.setMap(map);
						markers.push(marker);

					};

					var findMarker = function (location) {
						return _.find(markers, 'data._id', location._id);
					};

					var removeMarker = function (location) {
						var marker = findMarker(location);

						if (marker){
							markers.splice(markers.indexOf(marker),1);
							marker.setMap(null);
						} else {
							console.error('tried to remove non existing marker', location);
						}
					};

					var updateLocations = function (newVal, oldVal){
						var added = _.filter(newVal, function (l) {
							return !_.find(markers, 'data._id', l._id);
						});

						var removed = _.filter(markers, function (m) {
							return !_.find(newVal, '_id', m.data._id);
						});

						if (added.length || removed.length || newVal !== oldVal){
							added.forEach(addMarker);
							removed.forEach(removeMarker);
						}
					};

					var showMarker = function (evt, location) {
						ready.then(function(){
							var marker = findMarker(location);
							var markerPosition = mapUtils.getPixelPosition(marker.position, marker.map);
							var position = [markerPosition[0], markerPosition[1]];
							var headerCenter = [window.innerWidth / 2 , (window.innerWidth * 0.7) / 2];

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

					$rootScope.$on('map.center', showMarker);
					$rootScope.$on('map.zoom', setZoom);

					$scope.$watch(function () {
						return $scope.locations;
					}, updateLocations, true);




					console.log('init: map');
				}
			};
		});

})();
