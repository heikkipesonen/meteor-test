// Overwrite default underscore in Meteor
_ = lodash;

angular
  .module('lahiruoka', [
    'angular-meteor',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'lahiruoka.common',
    'maps',
    'imageUtils',
    'scroll',
    'slidelist',
    'dragview'
  ]);
