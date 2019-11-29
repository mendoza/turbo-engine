/* eslint-disable no-underscore-dangle */
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  createUsuario(payload) {
    const alreadyExists = Meteor.users.findOne({ 'emails.0.address': payload.email });
    if (alreadyExists) {
      return new Meteor.Error('El usuario ya existe');
    }
    return Accounts.createUser(payload);
  },
  updateUsers(payload) {
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = { ...payload };
    return Meteor.users.update(selector, modifier);
  },
  deleteUsers(payload) {
    if (Meteor.user().profile.role === 'superAdmin') {
      const user = Meteor.users.findOne({ _id: payload });
      if (user && user.profile.role !== 'superAdmin') {
        Meteor.users.remove({ _id: payload });
      } else {
        throw new Meteor.Error('superAdmin');
      }
    }
  },
  restorePass(payload) {
    return Accounts.setPassword(payload._id, payload.password);
  }
});
