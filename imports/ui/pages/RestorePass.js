import React, { PureComponent } from "react";
import { Accounts } from "meteor/accounts-base";
import { Container, Button, Typography, Grid, TextField,  } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
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
      const user = Meteor.users.findOne({'emails.0.address': correo});
      Accounts.setPassword(user && user._id, password, { logout: true });
      alert('Contraseña cambiada exitosamente');
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

export default RestorePass;