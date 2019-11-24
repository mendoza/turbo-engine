import { Meteor } from "meteor/meteor";
import Empresa from "./Empresa";
import Empleados from "../Empleados/Empleados";

Meteor.methods({
  getEmpresa() {
    return { ...Empresa.find().fetch()[0], cuantosEmpleados: Empleados.find().count() };
  },
  getEmpresaName() {
    return Empresa.find({}).fetch()[0].name;
  },
  getEmpresaRTN() {
    return Empresa.find({}).fetch()[0].RTN;
  },
  getEmpresaCAI() {
    return Empresa.find({}).fetch()[0].CAI;
  },
  updateEmpresa(payload) {
    console.log(payload)
    const selector = { _id: payload._id };
    delete payload._id;
    const modifier = payload;
    Empresa.update(selector, modifier);
    return Empresa.find(selector).fetch()[0];
  },
});
