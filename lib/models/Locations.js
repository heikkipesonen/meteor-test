Locations = new Mongo.Collection('locations');

Locations.TYPES = ['market', 'meeting', 'farm'];

Locations.attachSchema({
  name: {
    type: String
  },
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  },
  type: {
    type: String,
    allowedValues: Locations.TYPES
  }
});
