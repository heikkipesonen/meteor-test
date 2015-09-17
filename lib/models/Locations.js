Locations = new Mongo.Collection('locations');

Locations.attachSchema({
  latitude: {
    type: Number,
    decimal: true
  },
  longitude: {
    type: Number,
    decimal: true
  }
});