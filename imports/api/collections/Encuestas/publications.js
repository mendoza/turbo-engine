import Autos from "./Autos";

Meteor.publish('Autos.all', () => (Autos.find()));