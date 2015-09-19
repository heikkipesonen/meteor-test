(function(){

	function ViewService() {
		var vm = this;
		var update = vm.getSize.bind(vm);
		window.addEventListener('resize', update);
	}

	ViewService.prototype.getSize = function () {
		this.size = {
			width: window.innerWidth,
			heigth: window.innerHeight
		};
	}

	angular.module('lahiruoka')
	.service('view', ViewService);
})();