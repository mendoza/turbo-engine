// eslint-disable-next-line import/no-unresolved
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
  updateEmpresa(payload) {
    // eslint-disable-next-line no-underscore-dangle
    const selector = { _id: payload._id };
    // eslint-disable-next-line no-underscore-dangle
    delete payload._id;
    const modifier = payload;
    return Empresa.update(selector, modifier);
  },
});
