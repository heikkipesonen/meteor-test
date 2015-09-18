(function(){
	'use strict';

	function Statehistory(){
		var vm = this;
		vm.states = [];
		vm.current = null;
	}

	angular.module('lahiruoka')
	.service('statehistory', Statehistory)
});