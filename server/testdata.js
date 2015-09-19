var chance = new Chance();

Meteor.methods({
  'createTestData': function () {
    this.unblock();
    createTestData();
  }
});

createTestData = function () {
  Locations.remove({});
  Products.remove({});
  Producers.remove({});
  Users.remove({});

  var producers = [];
  var users = [];

  _.times(50, function () {
    var userId = Users.insert({
      name: chance.name(),
      level: _.sample(Users.LEVELS),
      address: chance.address()
    });

    users.push(userId);
  });

  _.times(50, function () {
    var producerId = Producers.insert({
      name: chance.sentence({words:2}),
      description: chance.paragraph(),
      type: _.sample(Producers.TYPES),
      address: chance.address(),
      latitude: Math.random()*6 + 60,
      longitude: Math.random()*8 + 22
    });

    producers.push(producerId);
  });


  _.times(100, function () {
    var locationId = Locations.insert({
      name: chance.word(),
      latitude: Math.random()*6 + 60,
      longitude: Math.random()*8 + 22,
      start_datetime: chance.hammertime(),
      end_datetime: chance.hammertime(),
      type: _.sample(Locations.TYPES),
      owner: _.sample(users)
    });

   _.times(chance.integer({min: 1, max: 10}), function () {
      Products.insert({
        location_id: locationId,
        producer_id: _.sample(producers),
        name: chance.sentence({words: 2}),
        description: chance.paragraph({sentences:1}),
        category: _.sample(Products.CATEGORIES),
        price: chance.floating({min: 0.5, max: 10}),
        unit: _.sample(Products.UNITS),
        available: chance.integer({min: 1, max: 10}),
        package_size: chance.integer({min:1, max: 20}),
        min_purchase: chance.integer({min:1, max: 10})
      });
    });
  });
};

if (Locations.find({}).count() === 0) {
  createTestData();
}
