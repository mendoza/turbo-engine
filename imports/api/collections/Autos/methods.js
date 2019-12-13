import { Meteor } from "meteor/meteor";
import Piezas from "../Piezas/Piezas";
import Auto from "./Autos";

Meteor.methods({
  addAuto(payload) {
    const { piezas } = payload;
    piezas.map(pieza => {
      console.log(pieza);
      return Piezas.update(
        { _id: pieza._id },
        {
          $set: {
            tipo: "pene",
          },
        }
      );
    });
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
