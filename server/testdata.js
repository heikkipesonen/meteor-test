var chance = new Chance();

insertTestData = function () {
  Locations.remove({});
  Products.remove({});

  _.times(100, function () {
    var locationId = Locations.insert({
      latitude: Math.random() + 60.2,
      longitude: Math.random() + 25,
      type: _.sample(Locations.TYPES)
    });

    _.times(chance.integer({min: 1, max: 10}), function () {
      Products.insert({
        location_id: locationId,
        name: chance.word(),
        company: chance.word(),
        category: _.sample(Products.CATEGORIES),
        price: chance.floating({min: 0.5, max: 10}),
        unit: _.sample(Products.UNITS),
        available: chance.integer({min: 1, max: 10})
      });
    });
  });
};

if (Locations.find({}).count() === 0) {
  insertTestData();
}
