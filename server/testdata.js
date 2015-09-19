angular.module('lahiruoka.backend').run(function (Locations, Products, Producers, Users, chance) {
  Meteor.methods({
    'createTestData': function () {
      this.unblock();
      createTestData();
    }
  });

  var randomPosition = function () {
    return {
      lat: Math.random() * 6 + 60,
      lng: Math.random() * 8 + 22,
      address: chance.address()
    };
  };

  var createTestData = function () {
    Locations.remove({});
    Products.remove({});
    Producers.remove({});
    Users.remove({
      'services.test': true
    });

    var producerIds = [];
    var userIds = [];

    _.times(50, function () {
      userIds.push(Users.insert({
        emails: [
          {
            address: chance.email(),
            verified: false
          }
        ],
        profile: {
          name: chance.name(),
          address: chance.address()
        },
        services: {
          test: true
        }
      }));
    });

    _.times(50, function () {
      producerIds.push(Producers.insert({
        owner: _.sample(userIds),
        name: chance.sentence({words:2}),
        description: chance.paragraph(),
        type: _.sample(Producers.TYPES),
        position: randomPosition()
      }));
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
      position: randomPosition(),
      type: _.sample(Locations.TYPES),
      owner: _.sample(userIds),
      active: active
    });

     _.times(chance.integer({min: 1, max: 10}), function () {
        Products.insert({
          location_id: locationId,
          producer_id: _.sample(producerIds),
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
});
