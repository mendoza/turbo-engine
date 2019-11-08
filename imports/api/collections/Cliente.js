import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

Cliente = new Mongo.Collection("Cliente");

Cliente.schema = new SimpleSchema({
    nombre: {type: String},
    apellido: {type: String},
    rtn: {type: Number},
    fechaDeNacimienti: {type: Date},
    telefono: {type: Number}
});

export default Cliente;