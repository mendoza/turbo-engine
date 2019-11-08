import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

Facturas = new Mongo.Collection("Facturas");

Facturas.schema = new SimpleSchema({
    numero: {type: Number},
    idDeCliente: {type: Number},
    fecha: {type: Date},
    productos: {type: Array},
    "productos.$": {type: String},
});

export default Facturas;