angular.module('lahiruoka.server').run(function (Categories) {
  Categories.allow({
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

  Meteor.publish('categories', function () {
    return Categories.find({});
  });
});
