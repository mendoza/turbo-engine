import Proveedor from "./Proveedor";

Meteor.methods({
  handleCreateProvider(payload) {
    Proveedor.insert(payload);
  },
  handleEditProvider(payload) {
    Proveedor.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } })
  },
  handleDeleteProvider(payload) {
    Proveedor.remove({ _id: payload });
  }
});