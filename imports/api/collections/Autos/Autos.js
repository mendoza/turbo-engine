import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Autos = new Mongo.Collection("Autos");

Autos.schema = new SimpleSchema({
  marca: { type: String },
  modelo: { type: String },
  tipo: { type: String },
  transmision: { type: String },
  color: { type: String },
  placa: { type: String },
  traccion: { type: String },
  year: { type: SimpleSchema.Integer },
  piezas: { type: Array },
  "piezas.$": { type: String },
  estado: { type: SimpleSchema.Integer },
  pictures: { type: Array },
  "pictures.$": { type: String },
});

export default Autos;
