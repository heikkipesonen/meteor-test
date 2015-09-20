angular.module('lahiruoka.common').service('Locations', function (PositionSchema) {
  Locations = new Mongo.Collection('locations');

  Locations.TYPES = ['market', 'meeting', 'farm'];

  var TimetableSchema = new SimpleSchema({
    start_datetime:{
      type: Date
    },
    end_datetime:{
      type: Date
    }
  });

  Locations.attachSchema({
    name: {
      type: String
    },
    active:{
      type:[TimetableSchema]
    },
    position: {
      type: PositionSchema
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
