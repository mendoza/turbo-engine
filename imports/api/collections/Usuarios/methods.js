import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  createUsuario(payload) {
    return Accounts.createUser(payload);
  },
  listUsuario(payload) {
    return Meteor.users.find({}).fetch();
  },
  updateUsers(payload) {
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = { ...payload };
    return Meteor.users.update(selector, modifier);
  },
  deleteUsers(payload) {
    const selector = { _id: payload._id };
    return Meteor.users.remove(selector);
  },
});
