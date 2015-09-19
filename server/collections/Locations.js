angular.module('lahiruoka.backend').run(function (Locations) {
  Locations.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
});
