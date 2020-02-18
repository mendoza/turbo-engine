import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import Autos from "../Autos/Autos";

const Cliente = new Mongo.Collection("Cliente");

Cliente.schema = new SimpleSchema({
  nombre: { type: String },
  apellido: { type: String },
  rtn: { type: Number },
  telefono: { type: Number },
  telefonoTrabajo: { type: Number },
  compania: { type: String },
  email: { type: String },
  autosComprados: { type: Array },
  "autosComprados.$": { type: String },
  autos: {type: Array},
  'autos.$':{type: String},
  clientType: {type: String}
});

export default Cliente;
