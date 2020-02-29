import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Index from "../imports/ui/Index";

Meteor.startup(() => {
  const generalTheme = createMuiTheme({
    palette: {
      primary: { main: '#231F3A', dark:'#231F3A', contrastText: '#ffffff' },
      secondary: { main: "#DA0024", contrastText: "#ffffff" },
      error: { main: '#DA0024' },
    },
  });
  render(
    <ThemeProvider theme={generalTheme}>
      <Index />
    </ThemeProvider>,
    document.getElementById("react-target")
  );
});
