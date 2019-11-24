import React, { PureComponent } from "react";
import { Grid, Typography, TextField, Button, Snackbar, IconButton, Icon } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import DashboardLayout from "../layouts/DashboardLayout";
import validator from "validator";

class Empresa extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      empresa: {},
      name: "",
      RTN: "",
      CAI: "",
      open: false,
      mensaje: "",
    };
    Meteor.call("getEmpresa", (error, result) => {
      this.setState({
        empresa: result,
        id: result._id,
        name: result.name,
        RTN: result.RTN,
        CAI: result.CAI,
      });
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { name, RTN, CAI, empresa, open, mensaje } = this.state;
    return (
      <DashboardLayout>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body1">{`Nombre: ${empresa.name}`}</Typography>
            <Typography variant="body1">{`RTN: ${empresa.RTN}`}</Typography>
            <Typography variant="body1">{`CAI: ${empresa.CAI}`}</Typography>
            <Typography variant="body1">{`Cuantos empleados: ${empresa.cuantosEmpleados}`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Nombre"
              fullWidth
              value={name}
              onInput={e => {
                this.setState({ name: e.target.value });
              }}
            />
            <TextField
              label="RTN"
              fullWidth
              value={RTN}
              onInput={e => {
                this.setState({ RTN: e.target.value });
              }}
            />
            <TextField
              label="CAI"
              fullWidth
              value={CAI}
              onInput={e => {
                this.setState({ CAI: e.target.value });
              }}
            />

          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              let alert;
              if (validator.isEmpty(name)) {
                alert = "El nombre no puede estar vacio.";
              }
              if (validator.isEmpty(RTN)) {
                alert = "El RTN no puede estar vacio.";
              }
              if (!validator.matches(RTN, /\d{4}-\d{4}-\d{6}/)) {
                alert = "El formato del rtn es incorrecto";
              }
              if (validator.isEmpty(CAI)) {
                alert = "El CAI no puede estar vacio.";
              }
              if (alert) {
                this.setState({ open: true, mensaje: alert });
              } else {
                Meteor.call("updateEmpresa", { name, RTN, CAI }, (error, result) => {
                  this.setState({
                    empresa: result,
                    id: result._id,
                    name: result.name,
                    RTN: result.RTN,
                    CAI: result.CAI,
                    open: true,
                    mensaje: "Datos actualizados exitosamente",
                  });
                });
              }
            }}>
            Actualizar
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">{mensaje}</span>}

            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                <i className="fas fa-times" />
              </IconButton>,
            ]}
          />
        </Grid>
      </DashboardLayout>
    );
  }
}

export default Empresa;
