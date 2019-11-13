import { Meteor } from "meteor/meteor";

Meteor.startup(() => {});

// Meteor.publish("links.all", () => Links.find());

Meteor.methods({
  insertJohnDoe: function(objectFromClient) {
    console.log(objectFromClient);
    // Links.schema.validate(objectFromClient);
    // Links.insert(objectFromClient);
  },
});
