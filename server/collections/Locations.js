angular.module('lahiruoka.server').run(function (Locations) {
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

  Meteor.publish('locations', function () {
    return Locations.find({});
  });
});
