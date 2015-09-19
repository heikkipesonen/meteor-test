Locations = new Mongo.Collection('locations');

Locations.TYPES = ['market', 'meeting'];

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
  active:{
    type:[Object]
  },
  "active.$.start_datetime":{
    type: Number
  },
  "active.$.end_datetime":{
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
