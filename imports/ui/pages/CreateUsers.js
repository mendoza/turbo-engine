import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar
} from "@material-ui/core";
import { LockOutlinedIcon } from "@material-ui/icons";
import { Meteor } from "meteor/meteor";
import DashboardLayout from "../layouts/DashboardLayout";

class CreateUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      correo: "",
      password: ""
    };
  }

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value
    });
  };

  handleCreate = () => {
    const { nombre, apellido, correo, password } = this.state;
    Meteor.call(
      "createUsuario",
      {
        email: correo,
        password,
        profile: {
          firstName: nombre,
          lastName: apellido,
          role: "empleado"
        }
      },
      err => {
        if (err) {
          alert("Error al crear usuario");
        } else {
          alert("Usuario creado exitosamente");
          this.setState({
            nombre: "",
            apellido: "",
            correo: "",
            password: ""
          });
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
            <form noValidate>
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleCreate}
              >
                Crear
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link href="#" variant="body2">
                    ¿Ya está registrado? Ingrese
                  </Link>
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
