angular.module('lahiruoka.backend').run(function (Products) {
  Products.allow({
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
