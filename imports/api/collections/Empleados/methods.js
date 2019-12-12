import Empleados from "./Empleados";

Meteor.methods({
  handleCreateEmpleado(payload) {
    Empleados.insert(payload);
  },
  handleEditEmpleado(payload) {
    Empleados.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } })
  },
  handleDeleteEmpleado(payload) {
    Empleados.remove({ _id: payload });
  }
});