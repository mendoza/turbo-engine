import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Proveedor = new Mongo.Collection("Proveedor");

Proveedor.schema = new SimpleSchema({
  nombre: { type: String },
  apellido: { type: String },
  direccion: { type: String},
  telefono: { type: Number },
  telefonoTrabajo: { type: Number },
  compania: { type: String },
  email: { type: String },
});

export default Proveedor;
