'use strict';

angular
  .module('lahiruoka')
  .run(runBlock);

function runBlock($rootScope, $state, $document) {
  $document[0].body.addEventListener('touchmove', function (evt) {
    evt.preventDefault();
  });

	$rootScope.$on('$stateChangeError', function () {
    console.log('stateChangeError', arguments);
		$state.go('root.landing');
	});
}
