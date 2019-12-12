import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Empleados = new Mongo.Collection("Empleados");

Empleados.schema = new SimpleSchema({
  nombre: { type: String },
  apellido: { type: String },
  telefono: { type: Number },
  fechaDeNacimiento: { type: Date },
  email: { type: String },
});

export default Empleados;
