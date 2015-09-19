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

  _.times(100, function () {
    var locationId = Locations.insert({
      name: chance.word(),
      latitude: Math.random()*6 + 60,
      longitude: Math.random()*8 + 22,
      type: _.sample(Locations.TYPES)
    });

    _.times(chance.integer({min: 1, max: 10}), function () {
      Products.insert({
        location_id: locationId,
        name: chance.sentence({words: 2}),
        description: chance.paragraph({sentences:1}),
        company: chance.sentence({words: 3}),
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
