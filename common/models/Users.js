Users = new Mongo.Collection('users');

Users.LEVELS = [0,1,2,3,4];

Users.attachSchema({
  name: {
    type: String
  },
  level: {
    type: Number,
    allowedValues: Users.LEVELS
  },
  address: {
    type: String
  }
});
