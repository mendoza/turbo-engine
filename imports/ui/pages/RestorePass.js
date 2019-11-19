/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { Container, Button, Typography, Grid, TextField, Snackbar, 
  IconButton} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";

class RestorePass extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
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
    

    handleClick = () =>{
      const {correo, password} = this.state;
      let {users} = this.props;
      let alert;

      if (validator.isEmail(correo) === false) {
        alert = "El campo correo es requerido";
      }
      if (validator.isEmpty(password) === true) {
        alert = "El campo contraseña es requerido";
      }

      if(alert){
        this.setState({
          open: true,
          message: alert,
        })
      }else{
        users = users.filter(user => user.emails[0].address === correo);
        Meteor.call(
          "restorePass", {
            _id: users[0]._id,
            password,
          },
        );
        this.setState({
          correo:"",
          password:"",
          open: true,
          message: "Contraseña restablecida exitosamente",
        })
    }
    }

    render(){
        const{correo, password, open, message} = this.state;
        return (
          <DashboardLayout>
            <Container>
              <Typography>
                      Reestablecer Contraseña
              </Typography>
              <form>
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
                    label="Nueva Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onInput={event => this.handleTextChange(event, "password")}
                    />
                </Grid>
                <Button 
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={this.handleClick}
                  >
                  Reestablecer
                </Button>
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
})(RestorePass);