import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Empresa = new Mongo.Collection("Autos");

Empresa.schema = new SimpleSchema({
  name: { type: String },
  RTN: { type: String },
  CAI: { type: String },
});

export default Empresa;
