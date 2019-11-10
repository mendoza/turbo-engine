import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

Piezas = new Mongo.Collection("Piezas");

Piezas.schema = new SimpleSchema({
  vendedor: { type: String },
  precio: { type: Number },
  numeroDeSerie: { type: String, optional: true },
  tipo: { type: String },
});

export default Piezas;