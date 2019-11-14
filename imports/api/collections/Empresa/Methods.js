import { Meteor } from "meteor/meteor";
import Empresa from "./Empresa";

Meteor.methods({
  startEmpresa(payload) {
    Empresa.insert(payload);
  },
  getEmpresa() {
    console.log("wenas")
    console.log(Empresa.find({}).fetch())
    // return ;
  },
  getEmpresaName() {
    return Empresa.find({}).fetch().name;
  },
  getEmpresaRTN() {
    return Empresa.find({}).fetch().RTN;
  },
  getEmpresaCAI() {
    return Empresa.find({}).fetch().CAI;
  },
});
