import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import Autos from "../Autos/Autos";

const Proveedor = new Mongo.Collection("Proveedor");

Proveedor.schema = new SimpleSchema({
  nombre: { type: String },
  apellido: { type: String },
  codigo: { type: Number },
  telefono: { type: Number },
  telefonoTrabajo: { type: Number },
  compania: { type: String },
  email: { type: String },
  autosComprados: { type: Array },
  "autosComprados.$": { type: String },
  autos: {type: Array},
  'autos.$':{type: String}
});

export default Proveedor;
