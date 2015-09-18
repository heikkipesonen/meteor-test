(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $document) {

    $document[0].body.addEventListener('touchmove', function (evt) {
      evt.preventDefault();
    });


  	$rootScope.$on('$stateChangeError', function () {
  		$state.go('root.landing');
  	});
  }

})();
