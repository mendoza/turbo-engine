import Autos from "./Autos";

Meteor.publish('Autos.all', () => (Autos.find()));

Meteor.publish('Autos.cliente', (autos)=> Autos.find({_id:{$in:autos}})); 