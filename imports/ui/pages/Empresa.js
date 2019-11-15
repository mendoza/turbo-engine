import React, { PureComponent } from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { Meteor } from "meteor/meteor";

class Empresa extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { empresa: {} };
  }

  componentDidMount = () => {
    Meteor.call("getEmpresa", (error, result) => {
      this.setState({ empresa: result });
    });
  };

  render() {
    const { empresa } = this.state;
    return (
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h1">Datos de la empresa</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`Nombre: ${empresa.name}`}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`RTN: ${empresa.RTN}`}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`CAI: ${empresa.CAI}`}</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Empresa;
