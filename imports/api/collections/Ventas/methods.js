import { Meteor } from "meteor/meteor";
import Ventas from "./Ventas";

Meteor.methods({
  addVentas(payload) {
    return Ventas.insert(payload);
  },
});
