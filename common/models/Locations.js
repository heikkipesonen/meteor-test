angular.module('lib').service('Locations', function (PositionSchema) {
  Locations = new Mongo.Collection('locations');

  Locations.TYPES = ['market', 'meeting', 'farm'];

  Locations.attachSchema({
    name: {
      type: String
    },
    position: {
      type: PositionSchema
    },
    start_datetime: {
      type: Number
    },
    end_datetime: {
      type: Number
    },
    owner: {
      type: String
    },
    type: {
      type: String,
      allowedValues: Locations.TYPES
    }
  });

  return Locations;
});
