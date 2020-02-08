import Ventas from "./Ventas";

Meteor.publish("Ventas.all", () => Ventas.find());
