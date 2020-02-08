import Empleados from "./Empleados";

Meteor.methods({
  handleCreateEmpleado(payload) {
    const rtnRepeated = Empleados.findOne({ rtn: payload.rtn });
    if (rtnRepeated) {
      return false;
    }
    Empleados.insert(payload);
    return true;
  },
  handleEditEmpleado(payload) {
    const rtnRepeated = Empleados.findOne({ rtn: payload.rtn });
    if (rtnRepeated && rtnRepeated._id !== payload._id) {
      return false;
    }
    Empleados.update({ _id: payload._id }, { ...payload, ...{ _id: undefined } });
    return true;
  },
  handleDeleteEmpleado(payload) {
    Empleados.remove({ _id: payload });
  }
});