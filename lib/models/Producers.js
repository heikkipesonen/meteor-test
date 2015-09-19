Producers = new Mongo.Collection('producers');
Producers.TYPES = ['organic farm','private field','home seller','free farm','self-service farm']

Producers.attachSchema({
  name: {
    type: String
  },
  description: {
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
  address: {
    type: String
  },
  type: {
    type: String,
    allowedValues: Producers.TYPES
  }
});
