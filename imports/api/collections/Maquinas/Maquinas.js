import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Maquinas = new Mongo.Collection("Maquinas");

Maquinas.schema = new SimpleSchema({
  tipo: {type: String},
  marca: { type: String },
  cantidad: { type: Number },
  descripcion: { type: String },
});

export default Maquinas;