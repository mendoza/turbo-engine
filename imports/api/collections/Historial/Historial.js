import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Historial = new Mongo.Collection("Historial");

Historial.schema = new SimpleSchema({
  cleinte: { type: String },
  producto: { type: String },
  tipo: { type: String },
  descripcion: { type: String },
  fecha: { type: String },
  comentario: { type: String },
});

export default Historial;