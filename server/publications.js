Meteor.publish('producers', function (producerId) {
  return Producers.find({
  	_id: producerId
  });
});

Meteor.publish('Users', function () {
  return Users.find({});
});

Meteor.publish('locations', function () {
  return Locations.find({});
});

Meteor.publish('products', function (locationId) {
  return Products.find({
    location_id: locationId
  });
});
