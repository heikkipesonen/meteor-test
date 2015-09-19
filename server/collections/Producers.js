angular.module('lahiruoka.backend').run(function (Producers) {
  Producers.allow({
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
