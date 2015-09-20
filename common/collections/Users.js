angular.module('lahiruoka.common').service('Users', function () {
  var EmailSchema = new SimpleSchema({
    address: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    verified: {
        type: Boolean
    }
  });

  var ProfileSchema = new SimpleSchema({
    name: {
      type: String
    },
    address: {
      type: String
    }
  });

  Meteor.users.attachSchema({
    emails: {
        type: [EmailSchema],
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function () {
          if (this.isInsert) {
            return new Date();
          }
        }
    },
    profile: {
        type: ProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
  });

  return Meteor.users;
});
