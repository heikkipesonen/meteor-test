angular.module('lahiruoka.common').service('Categories', function () {
  var Categories = new Mongo.Collection('categories');

  Categories.attachSchema({
    name: {
      type: String
    },
    subcategories: {
      type: [String],
      optional: true
    }
  });

  return Categories;
});
