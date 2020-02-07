import Maquina from "./Maquina";

Meteor.methods({
  addMaquina(payload) {
    Maquina.insert(payload);
  },
  editMaquina(payload) {
    Maquina.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } })
  },
  deleteMaquina(payload) {
    Maquina.remove({ _id: payload });
  }
});