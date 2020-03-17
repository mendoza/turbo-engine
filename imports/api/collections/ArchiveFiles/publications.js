import ArchiveFiles from "./ArchiveFiles";

Meteor.publish("ArchiveFiles.all", () => ArchiveFiles.find().cursor);
