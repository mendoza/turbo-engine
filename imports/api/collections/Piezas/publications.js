import Piezas from "./Piezas";

Meteor.publish("Piezas.all", () => Piezas.find());
