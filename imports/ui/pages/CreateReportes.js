import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {
  Grid,
  MenuItem,
  TextField,
  Select,
  Button,
  InputLabel,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import { TipoDeReportes, Prioridad } from "../Constants";

class CreateReportes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { comentario: "", tipo: 0, prioridad: 0, message: "", open: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { comentario, tipo, prioridad } = this.state;
    const payload = {
      comentario,
      tipo: TipoDeReportes[tipo],
      empleado: Meteor.userId(),
      fecha: new Date().getTime(),
      prioridad: Prioridad[prioridad],
    };
    let alert;
    if (validator.isEmpty(comentario)) {
      alert = "El campo comentario es requerido";
    }
    if (alert) {
      this.setState({ message: alert, open: true });
    } else {
      Meteor.call("addReporte", payload, err => {});
      this.setState({
        message: "Reporte creado exitosamente",
        open: true,
        comentario: "",
        tipo: 0,
        prioridad: 0,
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { message, open, tipo, prioridad, comentario } = this.state;
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
                value={comentario}
                label="Comentario"
                multiline
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="Tipo">Tipo</InputLabel>
              <Select
                onChange={this.handleChange}
                fullWidth
                name="tipo"
                value={tipo}
                variant="outlined"
                labelId="Tipo">
                {TipoDeReportes.map((tip, i) => {
                  return <MenuItem value={i}>{tip}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="prioridad">Prioridad</InputLabel>
              <Select
                onChange={this.handleChange}
                fullWidth
                name="prioridad"
                variant="outlined"
                value={prioridad}
                labelId="prioridad">
                {Prioridad.map((prio, i) => {
                  return <MenuItem value={i}>{prio}</MenuItem>;
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ open: false });
          }}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => {
                this.setState({ open: false });
              }}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
      </DashboardLayout>
    );
  }
}

export default CreateReportes;
