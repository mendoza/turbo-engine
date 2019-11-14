import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  createUsuario(payload) {
    return Accounts.createUser(payload);
  },
  listUsuario(payload) {
    return Meteor.users.find({}).fetch();
  },
  updateUsers(payload) {},
  deleteUsers(payload) {
    return Meteor.users.remove({ _id: payload.id });
  },
});
