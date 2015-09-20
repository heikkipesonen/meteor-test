angular.module('lahiruoka.server').run(function (Producers) {
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

  Meteor.publish('producers', function (producerId) {
    return Producers.find({
      _id: producerId
    });
  });
});
