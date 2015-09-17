if (Locations.find({}).count() === 0) {
  console.log('INSERTING TEST DATA');
  _.times(100, function () {
    Locations.insert({
      latitude: Math.random() + 60.2,
      longitude: Math.random() + 25
    });
  });
}