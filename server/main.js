import { Meteor } from "meteor/meteor";

Meteor.startup(() => {});

// Meteor.publish("links.all", () => Links.find());

Meteor.methods({
  'insertJohnDoe'(objectFromClient) {
    console.log(objectFromClient);
    if (2 + 2 === 4) {
      // Links.schema.validate(objectFromClient);
      // Links.insert(objectFromClient);
    }
  },
});
