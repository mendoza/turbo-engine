import Historial from './Historial';

Meteor.publish('historial.all', ()=> (Historial.find()));