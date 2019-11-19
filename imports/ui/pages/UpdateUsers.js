/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { Container, Button, Typography, Grid, TextField, FormControl } from "@material-ui/core";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title"

class UpdateUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      apellido: "",
      correo:"",
      password:"",
    };
  }

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  handleChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
    
  }

  handleClick = () => {
    const {id, nombre, apellido, correo, password} = this.state;
    Meteor.call(
      "updateUsers",
      {
        _id: id,
        email: correo,
        password,
        profile:{
          firstName: nombre,
          lastName: apellido,
          role: "empleado",
        }
      }
    , (error, result) => {
      console.log("esto es el resultado: ", result);
      console.log("esto es el error: ", error);
      console.log(this.state.id);
    });
  };

  render() {
    const {id, nombre, apellido, correo, password} = this.state;
    const {users} = this.props;
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
                  onChange={event => this.handleChange(event, "id")}
                  >
                  {users.map((user) => {
                    if (user){
                      return( 
                        <MenuItem 
                          key={user._id}
                          value={user._id}
                          >
                          {user._id} 
                          {' '}
                          - 
                          {' '}
                          {user.profile.firstName} 
                          {' '}
                          {user.profile.lastName}
                        </MenuItem>
                      );
                    }
                    return<></>;
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
              <Button fullWidth variant="contained" color="primary" onClick={this.handleClick}>
                Actualizar
              </Button>
            </Grid>
          </div>
        </Container>
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('users.all');
  return {
    users: Meteor.users.find().fetch(),
  }
})(UpdateUsers);
