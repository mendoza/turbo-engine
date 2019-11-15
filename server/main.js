import { Meteor } from "meteor/meteor";
import Empresa from "../imports/api/collections/Empresa/Empresa";
import "../imports/api/collections/Empresa/Methods";

Meteor.startup(() => {
  if (Empresa.find().count() === 0) {
    Empresa.insert({
      name: "Kike's autos",
      RTN: "0000-0000-000000",
      CAI: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
  }
});
