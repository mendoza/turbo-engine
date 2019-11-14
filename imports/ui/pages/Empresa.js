import React, { PureComponent } from "react";
import { Paper, Grid } from "@material-ui/core";
import { Meteor } from "meteor/meteor";

class Empresa extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    Meteor.call("getEmpresa", (error, result) => {
      console.log(error);
      console.log(result);
    });
  };

  render() {
    return (
      <Grid container>
        <Grid item>
          <Paper>wenas</Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Empresa;
