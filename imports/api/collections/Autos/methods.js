import { Meteor } from "meteor/meteor";
import { vehicle } from "faker";
import Autos from "./Autos";

Meteor.methods({
  generateFakeAutos(quantity) {
    const auto = { marca: vehicle.manufacturer(), modelo: vehicle.model()};
    console.log(auto);
    //return Autos.insert(auto);
  },
});
