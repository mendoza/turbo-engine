import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// eslint-disable-next-line no-undef
Ventas = new Mongo.Collection("Ventas");

// eslint-disable-next-line no-undef
Ventas.schema = new SimpleSchema({
  tipo: { type: String },
});

// eslint-disable-next-line no-undef
export default Ventas;
