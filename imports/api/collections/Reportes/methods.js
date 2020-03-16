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
    payload.datos.map(dar=>
      Reportes.update({_id: dar},{$set:{abierto:false}}));
  },
  deleteReporte(payload) {
    const selector = { _id: payload._id };
    return Reportes.remove(selector) > 0;
  },
});
