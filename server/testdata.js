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
      owner: _.sample(users),
      name: chance.sentence({words:2}),
      description: chance.paragraph(),
      type: _.sample(Producers.TYPES),
      position:{
        address: chance.address(),
        lat: Math.random()*6 + 60,
        lng: Math.random()*8 + 22
      }
    });

    producers.push(producerId);
  });


  _.times(100, function () {
    var active = [];

    _.times(chance.integer({min:1, max:10}), function () {

      var startTime = new Date();
      startTime.setDate(chance.integer({min:1, max:30}));
      startTime.setMonth(chance.integer({min:0, max:11}));
      startTime.setHours(chance.integer({min:0, max:23}));
      startTime.setMinutes(chance.integer({min:0, max:59}));

      var endTime = new Date(startTime.getTime());
      endTime.setHours(chance.integer({min: startTime.getHours(), max: startTime.getHours()+10}));

      active.push({
        start_datetime: startTime,
        end_datetime: endTime
      });

    });

    var locationId = Locations.insert({
      name: chance.word(),
      position:{
        address: chance.address(),
        lat: Math.random()*6 + 60,
        lng: Math.random()*8 + 22,
      },
      type: _.sample(Locations.TYPES),
      owner: _.sample(users),
      active: active
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
