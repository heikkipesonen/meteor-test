angular.module('lahiruoka.server').run(function (Producers) {
  Meteor.methods({
    getRandomProducer: function () {
      return Producers.findOne();
    }
  })
});
