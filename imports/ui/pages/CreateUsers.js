/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
// eslint-disable-next-line import/no-unresolved
import { Meteor } from "meteor/meteor";
import DashboardLayout from "../layouts/DashboardLayout";
import validator from "validator";
import { Snackbar, IconButton } from "@material-ui/core";

const Styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class CreateUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      open: false,
      message: "",
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  handleCreate = () => {
    const { nombre, apellido, correo, password } = this.state;

    let alert;
    if (validator.isEmpty(nombre) === true) {
      alert = "El campo nombre es requerido";
    }
    if (validator.isEmpty(apellido) === true) {
      alert = "El campo apellido es requerido";
    }
    if (validator.isEmail(correo) === false) {
      alert = "El campo correo es requerido";
    }
    if (validator.isEmpty(password) === true) {
      alert = "El campo contraseña es requerido";
    }

    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call(
        "createUsuario",
        {
          email: correo,
          password,
          profile: {
            firstName: nombre,
            lastName: apellido,
            role: "empleado",
          },
        },
        err => {
          if (err) {
            console.log(err);
            this.setState({
              open: true,
              message: "Hubo un error al crear el usuario",
            });
          } else {
            this.setState({
              open: true,
              message: "Usuario creado exitosamente",
            });
          }
        }
      );
    }
  };

  render() {
    const { nombre, apellido, correo, password, open, message } = this.state;
    return (
      <DashboardLayout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Usuarios
            </Typography>
            <form id="formUserLogin" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    value={nombre}
                    onInput={event => this.handleTextChange(event, "nombre")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lname"
                    value={apellido}
                    onInput={event => this.handleTextChange(event, "apellido")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    value={correo}
                    onInput={event => this.handleTextChange(event, "correo")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onInput={event => this.handleTextChange(event, "password")}
                  />
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleCreate}>
                Crear
              </Button>
            </form>
          </div>
          <Box mt={5}>{/* <Copyright /> */}</Box>
        </Container>
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
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
      </DashboardLayout>
    );
  }
}

export default CreateUsers;
