import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Grid, MenuItem, TextField, Select, Button, InputLabel } from "@material-ui/core";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import { TipoDeReportes } from "../Constants";
import validator from "validator";

class CreateReportes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { comentario: "", tipo: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { comentario, tipo } = this.state;
    const payload = {
      comentario,
      tipoDeReporte: TipoDeReportes[tipo],
      idEmpleado: Meteor.userId(),
      fecha: new Date().getTime(),
    };
    Meteor.call("addReporte", payload, err => {
      console.log(err);
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <DashboardLayout>
        <form onSubmit={this.handleSubmit}>
          <Title>Reportes</Title>
          <Grid container spacing={2} style={{ marginBottom: "5px" }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={this.handleChange}
                name="comentario"
                variant="outlined"
                label="Comentario"
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="Tipo">Tipo </InputLabel>
              <Select
                onChange={this.handleChange}
                fullWidth
                name="tipo"
                variant="outlined"
                labelId="Tipo"
                multiline>
                {TipoDeReportes.map((tipo, i) => {
                  return <MenuItem value={i}>{tipo}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth color="primary">
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </DashboardLayout>
    );
  }
}

export default CreateReportes;
