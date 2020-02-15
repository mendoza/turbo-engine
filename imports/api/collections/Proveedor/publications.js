import Proveedor from './Proveedor';

Meteor.publish('clientes.all', ()=> (Proveedor.find()));