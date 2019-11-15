import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

Trabajos = new Mongo.Collection("Trabajos");

Trabajos.schema = new SimpleSchema({
  tipo: { type: String },
  activo: { type: Boolean },
  idEmpleado: { type: String, regEx: SimpleSchema.RegEx.Id },
  idAuto: { type: String, regEx: SimpleSchema.RegEx.Id },
});

export default Trabajos;
