import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

// eslint-disable-next-line no-undef
Trabajos = new Mongo.Collection("Trabajos");

// eslint-disable-next-line no-undef
Trabajos.schema = new SimpleSchema({
  tipo: { type: String },
  activo: { type: Boolean },
  idEmpleado: { type: String, regEx: SimpleSchema.RegEx.Id },
  idAuto: { type: String, regEx: SimpleSchema.RegEx.Id },
});

// eslint-disable-next-line no-undef
export default Trabajos;
