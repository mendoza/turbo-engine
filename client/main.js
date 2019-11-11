import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import Index from "/imports/ui/Index";

Meteor.startup(() => {
  render(<Index />, document.getElementById("react-target"));
});
