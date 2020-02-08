import Empleado from './Empleados';

Meteor.publish('empleados.all', () => (Empleado.find()));
