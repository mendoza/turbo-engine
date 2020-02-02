import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Maquina = new Mongo.Collection("Maquina");

Cliente.schema = new SimpleSchema({
  Tipo: { type: String },
  Marca: { type: String },
  Cantidad: { type: Number },
  Especificaciones: { type: String },
});

export default Maquina;