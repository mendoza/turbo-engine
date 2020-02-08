import { Meteor } from "meteor/meteor";
import Encuestas from "./Encuestas";

Meteor.methods({
  insertEncuesta(payload) {
    return Encuestas.insert(payload);
  },
});
