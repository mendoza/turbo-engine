import { Meteor } from "meteor/meteor";
import { vehicle } from "faker";
import Autos from "./Autos";

Meteor.methods({
  generateFakeAutos(quantity) {
    for (let i = 0; i < quantity; i += 1) {
      const auto = { marca: vehicle.manufacturer(), modelo: vehicle.model() };
      console.log(auto);
    }
  },
});
