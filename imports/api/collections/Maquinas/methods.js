import Maquinas from "./Maquinas";

Meteor.methods({
  addMaquina(payload) {
    Maquinas.insert(payload);
  },
  editMaquina(payload) {
    Maquinas.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } })
  },
  deleteMaquina(payload) {
    Maquinas.remove({ _id: payload });
  }
});