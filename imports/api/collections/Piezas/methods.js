import { Meteor } from "meteor/meteor";
import Pieza from "./Piezas";

Meteor.methods({
  addPieza(payload) {
    return Pieza.insert(payload);
  },
  getPiezas() {
    return Pieza.find().fetch();
  },
  updatePieza(payload) {
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = payload;
    return Pieza.update(selector, modifier) > 0;
  },
  deletePieza(payload) {
    const selector = { _id: payload._id };
    return Pieza.remove(selector) > 0;
  },
});
