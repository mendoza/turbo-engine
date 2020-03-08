import Reportes from "./Reportes";

Meteor.publish("Reportes.all", () => Reportes.find());
