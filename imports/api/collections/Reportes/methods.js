import { Meteor } from "meteor/meteor";
import Reportes from "./Reportes";

Meteor.methods({
  addReporte(payload) {
    return Reportes.insert(payload);
  },
  getReporte() {
    return Reportes.find().fetch();
  },
  updateReporte(payload) {
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = payload;
    return Reportes.update(selector, modifier) > 0;
  },
  deleteReporte(payload) {
    const selector = { _id: payload._id };
    return Reportes.remove(selector) > 0;
  },
});
