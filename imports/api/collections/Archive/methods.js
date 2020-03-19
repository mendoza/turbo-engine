import { Meteor } from "meteor/meteor";
import Archive from "./Archive";

Meteor.methods({
  addArchive(payload) {
    return Archive.insert(payload);
  },
  getArchives() {
    return Archive.find().fetch();
  },
  updateArchive(payload) {
    const selector = { _id: payload._id };
    const modifier = payload;
    return Archive.update(selector, modifier) > 0;
  },
  deleteArchive(payload) {
    const selector = { _id: payload._id };
    return Archive.remove(selector) > 0;
  },
});
