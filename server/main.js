import { Meteor } from "meteor/meteor";

// For the users
import '../imports/api/collections/Usuarios/methods';
import '../imports/api/collections/Usuarios/publications';

Meteor.startup(() => {
  if (Meteor.users.find().fetch().length === 0) {
    const superAdmin = {
      email: 'ingenieria@ingenieria.com',
      password: 'Hola1234',
      profile: {
        firstName: 'Usuario',
        lastName: 'Administrador',
        role: 'superAdmin'
      }
    };
    Meteor.call('createUsers', superAdmin);
  }
});
