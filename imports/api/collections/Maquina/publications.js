import Maquina from './Maquina';

Meteor.publish('maquinas.all', () => (Maquina.find()));
