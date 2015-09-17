angular
  .module('lahiruoka', [
    'angular-meteor',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'maps',
    'imageUtils',
    'scroll'
  ]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['lahiruoka']);
});
