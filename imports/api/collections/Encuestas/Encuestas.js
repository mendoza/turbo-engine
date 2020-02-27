import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Encuestas = new Mongo.Collection("Encuestas");


Encuestas.schema = new SimpleSchema({
  score: { type: Number },
  comment: { type: String },
  fecha: { type: String },
});

export default Encuestas;
