import Tipos from "./Tipos";

Meteor.publish("Tipos.all", () => Tipos.find());
