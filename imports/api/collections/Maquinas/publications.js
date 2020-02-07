import Maquinas from "./Maquinas";

Meteor.publish("Maquinas.all", () => Maquinas.find());
