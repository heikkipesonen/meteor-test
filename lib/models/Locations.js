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
