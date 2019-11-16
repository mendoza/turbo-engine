import { Meteor } from "meteor/meteor";
import Empresa from "../imports/api/collections/Empresa/Empresa";
import "../imports/api/collections/Usuarios/publications";
import "../imports/api/collections/Empresa/Methods";
import "../imports/api/collections/Usuarios/methods";
import "../imports/api/collections/Autos/methods";

Meteor.startup(() => {
  if (Empresa.find().count() === 0) {
    Empresa.insert({
      name: "Kike's autos",
      RTN: "0000-0000-000000",
      CAI: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });
  }
  if (Meteor.users.find().fetch().length === 0) {
    const superAdmin = {
      email: "ingenieria@ingenieria.com",
      password: "Hola1234",
      profile: {
        firstName: "Usuario",
        lastName: "Administrador",
        role: "superAdmin",
      },
    };
    Meteor.call("createUsers", superAdmin);
  }
});
