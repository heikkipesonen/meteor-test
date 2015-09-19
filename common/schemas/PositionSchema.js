angular.module('lahiruoka.backend').service('PositionSchema', function () {
  var PositionSchema = new SimpleSchema({
    lat: {
      type: Number,
      decimal: true,
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
      decimal: true,
      min: -180,
      max: 180
    },
    address: {
      type: String
    }
  });

  return PositionSchema;
});
