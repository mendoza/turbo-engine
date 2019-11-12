import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
<<<<<<< HEAD:client/main.js
import Index from "/imports/ui/Index";

Meteor.startup(() => {
  render(<Index />, document.getElementById("react-target"));
=======
import App from "/imports/ui/App";

Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));
>>>>>>> 3d59a6eefd097fda771684d9cf4bb2ecf2b873af:client/main.jsx
});
