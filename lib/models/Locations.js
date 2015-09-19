Locations = new Mongo.Collection('locations');

Locations.TYPES = ['market', 'meeting'];

PositionSchema = new SimpleSchema({
  lat: {
    type: Number,
    decimal: true,
    min: -90,
    max: 90
  },
  lng: {
    type: Number,
    decimal: true,
    min: -180,
    max: 180
  },
  address: {
    type: String,
    optional: true
  }
});

Timetable = new SimpleSchema({
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
    type:[Timetable]
  },
  owner: {
    type: String
  },
  position: {
    type: PositionSchema
  },
  type: {
    type: String,
    allowedValues: Locations.TYPES
  }
});
