import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import Index from "/imports/ui/Index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const titleTheme = createMuiTheme({
  palette: {},
});

Meteor.startup(() => {
  render(
    <ThemeProvider theme={titleTheme}>
      <Index />
    </ThemeProvider>,
    document.getElementById("react-target")
  );
});
