import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Piezas = new Mongo.Collection("Piezas");

Piezas.schema = new SimpleSchema({
  marca: {type: String},
  vendedor: { type: String },
  precio: { type: Number },
  numeroDeSerie: { type: String, optional: true },
  tipo: { type: String },
  cantidad: {type: Number},
});

export default Piezas;