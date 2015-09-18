Meteor.publish('locations', function () {
  return Locations.find({});
});

Meteor.publish('products', function (locationId) {
  return Products.find({
    location_id: locationId
  });
});
