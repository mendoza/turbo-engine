import { Meteor } from "meteor/meteor";
import Links from "/imports/api/links";

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

<<<<<<< HEAD
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
=======
Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink("Do the Tutorial", "https://www.meteor.com/tutorials/react/creating-an-app");

    insertLink("Follow the Guide", "http://guide.meteor.com");

    insertLink("Read the Docs", "https://docs.meteor.com");

    insertLink("Discussions", "https://forums.meteor.com");
  }
>>>>>>> 3d59a6eefd097fda771684d9cf4bb2ecf2b873af
});
