/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from "react";
import { Container, Button, Typography, Grid, TextField,  } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";

class RestorePass extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
          correo: "",
          password: "",
        };
    }

    handleTextChange = (event, stateVariable) => {
        this.setState({
          [stateVariable]: event.target.value,
        });
      };
    

    handleClick = () =>{
      const {correo, password} = this.state;
      let {users} = this.props;
      users = users.filter(user => user.emails[0].address === correo);
      console.log(users);
      Meteor.call(
        "restorePass", {
          _id: users[0]._id,
          password,
        },
      );
      alert("Contraseña restablecida exitosamente");
      this.setState({
        correo:"",
        password:"",
      })
    }

    render(){
        const{correo, password} = this.state;
        return (
          <DashboardLayout>
            <Container>
              <Typography>
                      Reestablecer Contraseña
              </Typography>
              <form noValidate>
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
              </form>
              <Button 
                type="submit"
                color="primary"
                variant="contained"
                onClick={this.handleClick}
              >
                  Reestablecer
              </Button>
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
})(RestorePass);