import Maquina from "./Maquina";

Meteor.methods({
  handleCreateClient(payload) {
    Maquina.insert(payload);
  },
  handleEditClient(payload) {
    Maquina.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } })
  },
  handleDeleteClient(payload) {
    Maquina.remove({ _id: payload });
  }
});