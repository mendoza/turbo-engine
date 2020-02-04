import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Maquina = new Mongo.Collection("Maquina");

Maquina.schema = new SimpleSchema({
  tipo: { type: String },
  marca: { type: String },
  cantidad: { type: Number },
  especificaciones: { type: String },
});

export default Maquina;