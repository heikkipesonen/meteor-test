angular.module('lahiruoka.server').run(function (Products) {
  Products.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });

  Meteor.publish('products', function (params) {
    return Products.find(params);
  });
});
