/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { Container, Button, Typography, Grid, TextField } from "@material-ui/core";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title"

class UpdateUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      apellido: "",
      correo: "",
      services: "",
    };
  }

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  handleChange = (event, stateVariable) => {
    let { users } = this.props;
    users = users.filter(user => user._id === event.target.value);
    console.log(users);
    this.setState({
      id: users[0]._id,
      correo: users[0].emails[0].address,
      nombre: users[0].profile.firstName,
      apellido: users[0].profile.lastName,
      services: users[0].services,
    });
    console.log(users[0].services);
  };

  handleClick = e => {
    e.preventDefault();
    const { id, nombre, apellido, correo, services } = this.state;
    Meteor.call(
      "updateUsers",
      {
        _id: id,
        emails: [
          {
            address: correo,
            verified: false,
          },
        ],
        services,
        profile: {
          firstName: nombre,
          lastName: apellido,
          role: "empleado",
        },
      },
    );
    alert("Usuario actualizado exitosamente");
          this.setState({
            nombre: "",
            apellido: "",
            correo: "",
            services: "",
          });
  };

  render() {
    const { id, nombre, apellido, correo, password } = this.state;
    const { users } = this.props;
    return (
      <DashboardLayout>
        <Container>
          <Title>
            Actualizar Usuarios
          </Title>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  required
                  label="Id"
                  id="id"
                  value={id}
                  onChange={event => this.handleChange(event, "id")}>
                  {users.map(user => {
                    if (user) {
                      return (
                        <MenuItem key={user._id} value={user._id}>
                          {user._id} - {user.profile.firstName} {user.profile.lastName}
                        </MenuItem>
                      );
                    }
                    return <></>;
                  })}
                </Select>
              </Grid>
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
                  autoComplete="lname"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  autoFocus
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
              <Button type="submit" fullWidth variant="contained" color="primary">
                Actualizar
              </Button>
            </Grid>
          </form>
        </Container>
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("users.all");
  return {
    users: Meteor.users.find().fetch(),
  };
})(UpdateUsers);
