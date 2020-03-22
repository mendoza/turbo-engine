import { Meteor } from "meteor/meteor";
import Archive from "./Archive";
import ArchiveFiles from "../ArchiveFiles/ArchiveFiles";

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
  deleteArchivePicture(payload) {
    ArchiveFiles.remove({ _id: payload });
  },
  deleteArchive(payload) {
    const selector = { _id: payload._id };
    const one = Archive.findOne(selector);
    one.pictures.map(id => {
      ArchiveFiles.remove({ _id: id });
    });
    return Archive.remove(selector) > 0;
  },
});