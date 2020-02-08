import { Meteor } from "meteor/meteor";
import Ventas from "./Ventas";

Meteor.methods({
  addTipo(payload) {
    return Ventas.insert(payload);
  },
});
