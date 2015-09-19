Producers = new Mongo.Collection('producers');
Producers.TYPES = ['organic farm','private field','home seller','free farm','self-service farm']

Producers.attachSchema({
  name: {
    type: String
  },
  owner: {
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
