import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Tipos = new Mongo.Collection("Tipos");

Tipos.schema = new SimpleSchema({
    nombre: {type: String},
    
});

export default Tipos;