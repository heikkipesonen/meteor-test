// Overwrite default underscore in Meteor
_ = lodash;

angular
  .module('lahiruoka', [
    'angular-meteor',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'maps',
    'imageUtils',
    'scroll',
    'slidelist',
    'lahiruoka.common'
  ]);
