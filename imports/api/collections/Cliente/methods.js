import Cliente from "./Cliente";

Meteor.methods({
  handleCreateClient(payload) {
    Cliente.insert(payload);
  },
  handleEditClient(payload) {
    Cliente.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } })
  },
  handleDeleteClient(payload) {
    Cliente.remove({ _id: payload });
  }
});