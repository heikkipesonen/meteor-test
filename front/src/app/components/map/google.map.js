(function () {

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


		.directive('googleMap', function($googleMapConfig, mapService, $rootScope, $q){
			return {
				restrict:'AE',
				link:function($scope, $element){
					var map  = new google.maps.Map($element[0], $googleMapConfig);
					var ready = $q.defer();

					mapService.setMap(map);

					$rootScope.$broadcast('map.init');
					$rootScope.mapReady = ready.promise;

					google.maps.event.addListenerOnce(map, 'idle', function(){
  					ready.resolve();
					});
				}
			};
		});

})();