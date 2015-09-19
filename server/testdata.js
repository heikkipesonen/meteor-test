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
      lng: Math.random() * 8 + 22
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
        name: chance.sentence({words:2}),
        description: chance.paragraph(),
        type: _.sample(Producers.TYPES),
        address: chance.address(),
        position: randomPosition()
      }));
    });


    _.times(100, function () {
      var locationId = Locations.insert({
        name: chance.word(),
        start_datetime: chance.hammertime(),
        end_datetime: chance.hammertime(),
        type: _.sample(Locations.TYPES),
        owner: _.sample(userIds),
        position: randomPosition()
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
