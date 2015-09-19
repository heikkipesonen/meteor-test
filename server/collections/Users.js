angular.module('lahiruoka.backend').run(function (Users) {
  Users.allow({
    insert: function () {
      return false;
    },
    update: function () {
      return false;
    },
    remove: function () {
      return false;
    }
  });
});
