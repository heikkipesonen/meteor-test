angular.module('lib').service('PositionSchema', function () {
  var PositionSchema = new SimpleSchema({
    latitude: {
      type: Number,
      decimal: true,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      decimal: true,
      min: -180,
      max: 180
    }
  });

  return PositionSchema;
});
