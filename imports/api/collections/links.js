import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
Links = new Mongo.Collection("links");
Links.schema = new SimpleSchema({
  name: { type: String },
  incompleteCount: { type: Number, defaultValue: 0 },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});
export default Links;
