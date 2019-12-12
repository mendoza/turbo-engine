import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, Button } from '@material-ui/core';
import Index from "../imports/ui/Index";

Meteor.startup(() => {
  const theme = createMuiTheme({
    pallete: {
      primary: { main: "#4281DF", contrastText: "#ffffff" },
      secondary: { main: "#231F3A", contrastText: "#ffffff" },
      error: { main: '#DA0024' },
    }
  });
  render(
    <ThemeProvider theme={theme}>
      <Button color="primary" variant="contained">asdf</Button>
      <Index />
    </ThemeProvider>,
    document.getElementById("react-target")
  );
});
