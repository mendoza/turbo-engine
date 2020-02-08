import Cliente from './Cliente';

Meteor.publish('clientes.all', ()=> (Cliente.find()));