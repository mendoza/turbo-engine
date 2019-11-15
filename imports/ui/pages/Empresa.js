import React, { PureComponent } from "react";
import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";
import { Meteor } from "meteor/meteor";

class Empresa extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { empresa: {}, name: "", RTN: "", CAI: "" };
  }

  componentDidMount = () => {
    Meteor.call("getEmpresa", (error, result) => {
      this.setState({ empresa: result });
    });
  };

  render() {
    const { empresa, name, RTN, CAI } = this.state;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h1">Datos de la empresa</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`Nombre: ${empresa.name}`}</Typography>
            <TextField
              label="Nombre"
              fullWidth
              value={name}
              onInput={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`RTN: ${empresa.RTN}`}</Typography>
            <TextField
              label="RTN"
              fullWidth
              value={RTN}
              onInput={e => {
                this.setState({ RTN: e.target.value });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`CAI: ${empresa.CAI}`}</Typography>
            <TextField
              label="CAI"
              fullWidth
              value={CAI}
              onInput={e => {
                this.setState({ CAI: e.target.value });
              }}
            />
          </Paper>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            Meteor.call("updateEmpresa", { _id: empresa._id, name, RTN, CAI });
          }}>
          Actualizar
        </Button>
      </Grid>
    );
  }
}

export default Empresa;
