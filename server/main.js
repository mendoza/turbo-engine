import { Meteor } from "meteor/meteor";
import "../imports/api/collections/Usuarios/publications";
import "../imports/api/collections/Autos/publications";
import "../imports/api/collections/Piezas/publications";
import Empresa from "../imports/api/collections/Empresa/Empresa";
import "../imports/api/collections/Empresa/methods";
import "../imports/api/collections/Usuarios/methods";
import "../imports/api/collections/Piezas/methods";
import "../imports/api/collections/Autos/methods";
import "../imports/api/collections/AutosFiles/publications";
import "../imports/api/collections/Encuestas/Encuestas";
import "../imports/api/collections/Encuestas/methods";

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
    Meteor.call("createUsuario", superAdmin);
  }
});
