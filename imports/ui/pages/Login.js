import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Box, Paper, TextField, Button, Grid, Snackbar, IconButton } from "@material-ui/core";
import isEmail from 'validator/lib/isEmail';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      redirect: props.isLogged,
      open: false,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  changeText = (event, stateValue) => {
    let error;
    if (stateValue === 'email') {
      error = !isEmail(event.target.value);
      if (error) {
        error = 'Correo no válido';
      }
    }
    if (stateValue === 'password') {
      error = event.target.value.length < 8;
      if (error) {
        error = 'La contraseña debe tener al menos 8 caractéres';
      }
    }
    const stateValueError = `${stateValue}Error`;
    this.setState({
      [stateValue]: event.target.value,
      [stateValueError]: error,
    });
  };

  handleLogin = event => {
    event.preventDefault();
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({ open: true });
      } else {
        this.setState({ redirect: true });
      }
    });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return undefined;
  };

  render() {
    const { email, emailError, password, passwordError, open } = this.state;
    return (
      <Box
        className="w-100"
        style={{
          height: "100vh",
          background: "#e8eaf6",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Grid container>
          <Grid item xs={1} md={3} lg={4} />
          <Grid item xs={10} md={6} lg={4}>
            <form onSubmit={this.handleLogin}>
              <Paper style={{ padding: "1rem" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      fontSize="5rem"
                      className="w-100"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="primary">
                      <span style={{ color: "#303f9f" }}>
                        <i className="fas fa-user" />
                      </span>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={email}
                      error={emailError}
                      helperText={emailError || ''}
                      label="Correo Electrónico"
                      onInput={event => this.changeText(event, "email")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Contraseña"
                      value={password}
                      error={passwordError}
                      helperText={passwordError || ''}
                      onInput={event => this.changeText(event, "password")}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth type="submit" color="primary" variant="contained">
                      Ingresar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
          <Grid item xs={1} md={3} lg={4} />
        </Grid>
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
          message={<span id="message-id">Correo Electrónico o Contraseña Incorrectos</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
        {this.renderRedirect()}
      </Box>
    );
  }
}

export default Login;
