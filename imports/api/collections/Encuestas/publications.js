import Autos from "./Encuestas";

Meteor.publish('encuestas.all', () => (Autos.find()));