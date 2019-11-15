import React, { PureComponent } from "react";
import { Container, Typography, Button, Grid, TextField } from "@material-ui/core";
import { Meteor } from "meteor/meteor";

class DeleteUsers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { id: "" };
  }

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  render() {
    const { id } = this.state;
    return (
      <Container>
        <Typography variant="h1">Eliminar</Typography>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="id"
              label="id"
              name="id"
              autoComplete="id"
              value={id}
              onInput={event => this.handleTextChange(event, "id")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                const { id } = this.state;
                Meteor.call("deleteUsers", { id }, (error, result) => {

                });
              }}
              fullWidth
              color="default">
              Borrar :v
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default DeleteUsers;
