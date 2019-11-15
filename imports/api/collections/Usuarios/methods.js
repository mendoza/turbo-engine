import { Meteor } from "meteor/meteor";

Meteor.methods({
  createUsers(payload) {
    Accounts.createUser(payload);
  },
});
