import { Meteor } from "meteor/meteor";
import Empresa from "./Empresa";

Meteor.methods({
  startEmpresa(payload) {
    Empresa.insert(payload);
  },
  getEmpresa() {
    return Empresa.find({}).fetch()[0];
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
});
