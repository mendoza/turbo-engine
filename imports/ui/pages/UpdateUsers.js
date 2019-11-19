/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { Container, Button, IconButton, Grid, TextField,
   Snackbar, Select, MenuItem } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";

class UpdateUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nombre: "",
      apellido: "",
      correo: "",
      services: "",
      open: false,
      message: "",
    };
    if (props.location.state !== undefined) {
      const { user } = props.location.state;
      this.state = {
        id: user._id,
        nombre: user.profile.firstName,
        apellido: user.profile.lastName,
        correo: user.emails[0].address,
        services: user.profile.services,
      };
    }
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

  handleChange = (event, stateVariable) => {
    let { users } = this.props;
    users = users.filter(user => user._id === event.target.value);
    //console.log(users);
    this.setState({
      id: users[0]._id,
      correo: users[0].emails[0].address,
      nombre: users[0].profile.firstName,
      apellido: users[0].profile.lastName,
      services: users[0].services,
    });
    //console.log(users[0].services);
  };

  handleClick = () => {
    const { id, nombre, apellido, correo, services,} = this.state;
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
    if(alert){
      this.setState({
        open:true,
        message:alert,
      })
    }else{
      Meteor.call("updateUsers", {
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
      });
      this.setState({
        nombre: "",
        apellido: "",
        correo: "",
        services: "",
        open: true,
        message: "Usuario actualizado exitosamente",
      });
  }
  };

  render() {
    const { id, nombre, apellido, correo, open, message } = this.state;
    const { users } = this.props;
    return (
      <DashboardLayout>
        <Container>
          <Title>Actualizar Usuarios</Title>
          <form onSubmit={this.handleSubmit}>
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
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="primary" 
                onClick={this.handleClick}
                >
                Actualizar
              </Button>
            </Grid>
          </form>
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

export default withTracker(() => {
  Meteor.subscribe("users.all");
  return {
    users: Meteor.users.find().fetch(),
  };
})(UpdateUsers);
