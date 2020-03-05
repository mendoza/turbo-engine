import Encuestas from "./Encuestas";

Meteor.publish("Encuestas.all", () => Encuestas.find());
