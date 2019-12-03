import { Meteor } from "meteor/meteor";
import Tipo from "./Tipos";

Meteor.methods({
  addTipo(payload) {
    return Tipo.insert(payload);
  },
  getTipo() {
    return Tipo.find().fetch();
  },
  updateTipo(payload) {
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = payload;
    return Tipo.update(selector, modifier) > 0;
  },
  deleteTipo(payload) {
    const selector = { _id: payload._id };
    return Tipo.remove(selector) > 0;
  },
});
