import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Reportes = new Mongo.Collection("Reportes");

Reportes.schema = new SimpleSchema({
  prioridad: { type: String },
  fecha: { type: String },
  empleado: { type: String },
  tipo: { type: String },
  comentario: { type: String },
  abierto: { type: Boolean, defaultValue: true },
});

export default Reportes;
