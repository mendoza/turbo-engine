import Proveedor from './Proveedor';

Meteor.publish('proveedores.all', ()=> (Proveedor.find()));