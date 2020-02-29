import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Reportes = new Mongo.Collection("Reportes");

Reportes.schema = new SimpleSchema({
    comentario: {type: String},
    tipoDeReporte: {type: String},
    idEmpleado: {type: String},
    fecha: {type: String},
});

export default Reportes;