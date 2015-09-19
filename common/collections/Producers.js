angular.module('lahiruoka.backend').service('Producers', function (PositionSchema) {
  Producers = new Mongo.Collection('producers');

  Producers.TYPES = [
    'organic farm',
    'private field',
    'home seller',
    'free farm',
    'self-service farm'
  ];

  Producers.attachSchema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    position: {
      type: PositionSchema
    },
    type: {
      type: String,
      allowedValues: Producers.TYPES
    }
  });

  return Producers;
});
