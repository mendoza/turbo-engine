import { Meteor } from "meteor/meteor";
import Historial from "./Historial";

Meteor.methods({
  addHistorial(payload) {
    return Historial.insert(payload);
  },
  getHistorial() {
    return Historial.find().fetch();
  },
  updateHistorial(payload) {
    const selector = { _id: payload._id };
    const modifier = payload;
    return Historial.update(selector, modifier) > 0;
  },
  deleteHistorial(payload) {
    const selector = { _id: payload._id };
    return Historial.remove(selector) > 0;
  },
});
