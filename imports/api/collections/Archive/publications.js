import Archive from "./Archive";

Meteor.publish("Archive.all", () => Archive.find());
