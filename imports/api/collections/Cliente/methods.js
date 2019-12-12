import Cliente from "./Cliente";

Meteor.methods({
  handleCreateClient(payload) {
    Cliente.insert(payload);
  }
});