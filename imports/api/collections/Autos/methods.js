import { Meteor } from "meteor/meteor";
import Auto from "./Autos";

Meteor.methods({
  addAuto(payload) {
    return Auto.insert(payload);
  },
  getAutos() {
    return Auto.find().fetch();
  },
  updateAuto(payload) {
    const selector = { _id: payload._id };
    const modifier = payload;
    return Auto.update(selector, modifier) > 0;
  },
  deleteAuto(payload) {
    const selector = { _id: payload._id };
    return Auto.remove(selector) > 0;
  },
});
