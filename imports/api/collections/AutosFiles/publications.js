import AutosFiles from './AutosFiles';

Meteor.publish('AutosFiles.all', () => (
  AutosFiles.find().cursor
));
