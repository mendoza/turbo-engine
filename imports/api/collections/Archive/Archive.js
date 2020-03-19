import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Archive = new Mongo.Collection("Archive");

Archive.schema = new SimpleSchema({
  nombre: { type: String },
  pictures: { type: Array },
  "pictures.$": { type: String },
});

export default Archive;
