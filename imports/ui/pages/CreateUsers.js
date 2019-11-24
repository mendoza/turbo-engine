import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
// eslint-disable-next-line import/no-unresolved
import { Meteor } from "meteor/meteor";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";

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
    };
  }

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  handleCreate = () => {
    const { nombre, apellido, correo, password } = this.state;
    let validator = require("validator");

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
        if (
          validator.isEmail(correo) === true &&
          validator.isEmpty(nombre) === false &&
          validator.isEmpty(apellido) === false &&
          validator.isEmpty(password) === false
        ) {
          alert("Usuario creado exitosamente");
          this.setState({
            nombre: "",
            apellido: "",
            correo: "",
            password: "",
          });
        } else {
          if (validator.isEmpty(nombre) === true) {
            alert("Este Campo es requerido,por favor ingrese su nombre");
          }
          if (validator.isEmpty(apellido) === true) {
            alert("Este Campo es requerido,por favor ingrese su apellido");
          }
          if (validator.isEmail(correo) === false) {
            alert("Este Campo es requerido,por favor ingrese un correo valido");
          }
          if (validator.isEmpty(password) === true) {
            alert("Este Campo es requerido,por favor ingrese su contraseña");
          }
        }
      }
    );
  };

  render() {
    const { nombre, apellido, correo, password } = this.state;
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
              <Grid container justify="flex-end">
                <Grid item>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link href="#" variant="body2" />
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>{/* <Copyright /> */}</Box>
        </Container>
      </DashboardLayout>
    );
  }
}

export default CreateUsers;
