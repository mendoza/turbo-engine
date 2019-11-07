import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

Autos = new Mongo.Collection("Autos");

Autos.schema = new SimpleSchema({
  name: { type: String },
  incompleteCount: { type: Number, defaultValue: 0 },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

export default Autos