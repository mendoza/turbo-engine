import { Meteor } from "meteor/meteor";
import Maquinas from "./Maquinas";

Meteor.methods({
  addMaquina(payload) {
    return Maquinas.insert(payload);
  },
  getMaquinas() {
    return Maquinas.find().fetch();
  },
  updateMaquina(payload) {
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = payload;
    return Maquinas.update(selector, modifier) > 0;
  },
  deleteMaquina(payload) {
    const selector = { _id: payload._id };
    return Maquinas.remove(selector) > 0;
  },
});
