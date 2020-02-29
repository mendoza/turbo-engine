import React, { PureComponent } from "react";
import { Container, Paper, Grid, Typography } from "@material-ui/core";

class Error404 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <Paper style={{ padding: "2%" }}>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <i
                className="fas fa-exclamation-triangle"
                fontSize="large"
                style={{ fontSize: "128pt", color: "red" }}
              />
            </Grid>
            <Grid item>
              <Typography align="justify" variant="h3">
                Error 404
              </Typography>
              <Typography align="justify" variant="h5">
                Parece que no pudimos encontrar la pagina que buscabas
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default Error404;
