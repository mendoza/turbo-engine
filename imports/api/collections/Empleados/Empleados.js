import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Empleados = new Mongo.Collection("Empleados");

Empleados.schema = new SimpleSchema({
  nombre: { type: String },
  apellido: { type: String },
  telefono: { type: Number },
  email: { type: String },
  rtn: { type: String }
});

export default Empleados;
