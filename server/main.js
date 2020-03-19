import { Meteor } from "meteor/meteor";
import "../imports/api/collections/Usuarios/publications";
import "../imports/api/collections/Autos/publications";
import "../imports/api/collections/Piezas/publications";
import "../imports/api/collections/Tipos/publications";
import Empresa from "../imports/api/collections/Empresa/Empresa";
import "../imports/api/collections/Empresa/methods";
import "../imports/api/collections/Usuarios/methods";
import "../imports/api/collections/Piezas/methods";
import "../imports/api/collections/Autos/methods";
import "../imports/api/collections/Tipos/methods";
import "../imports/api/collections/AutosFiles/publications";
import "../imports/api/collections/ArchiveFiles/publications";
import "../imports/api/collections/Encuestas/Encuestas";
import "../imports/api/collections/Cliente/pubications";
import "../imports/api/collections/Cliente/methods";
import "../imports/api/collections/Empleados/publications";
import "../imports/api/collections/Empleados/methods";
import "../imports/api/collections/Historial/methods";
import "../imports/api/collections/Historial/publications";
import "../imports/api/collections/Maquinas/methods";
import "../imports/api/collections/Maquinas/publications";
import "../imports/api/collections/Proveedor/methods";
import "../imports/api/collections/Proveedor/publications";
import "../imports/api/collections/Reportes/publications";
import "../imports/api/collections/Reportes/methods";
import "../imports/api/collections/Proveedor/publications";
import "../imports/api/collections/Encuestas/methods";
import "../imports/api/collections/Encuestas/publications";
import "../imports/api/collections/Archive/methods";
import "../imports/api/collections/Archive/publications";

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
