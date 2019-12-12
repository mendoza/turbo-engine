import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Cliente = new Mongo.Collection("Cliente");

Cliente.schema = new SimpleSchema({
  nombre: { type: String },
  apellido: { type: String },
  rtn: { type: Number },
  fechaDeNacimiento: { type: Date },
  telefono: { type: Number },
  telefonoTrabajo: { type: Number },
  compania: { type: String },
  email: { type: String },
});

export default Cliente;