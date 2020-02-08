import React from "react";
// eslint-disable-next-line import/no-unresolved
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";

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
              <i className="fas fa-user-lock" />
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
