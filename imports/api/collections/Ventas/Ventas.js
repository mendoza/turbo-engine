import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// eslint-disable-next-line no-undef
Ventas = new Mongo.Collection("Ventas");

// eslint-disable-next-line no-undef
Ventas.schema = new SimpleSchema({
  rtn: { type: String },
  cai: { type: String },
  fecha: { type: Date },
});

// eslint-disable-next-line no-undef
export default Ventas;
