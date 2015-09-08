(function() {
  'use strict';

  angular
    .module('lahiruoka')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state) {

  	$rootScope.$on('$stateChangeError', function () {
  		$state.go('root');
  	});
  }

})();
