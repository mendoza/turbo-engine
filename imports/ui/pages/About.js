import React, { PureComponent } from "react";
import { Typography, Grid } from "@material-ui/core";

class About extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Grid direction="column" container>
        <Typography variant="h1">About</Typography>
        <Grid item>
          {/* <Typography variant="body1">
            {`La empresa ${Empresa.name} con RTN: ${Empresa.rtn} ha "contratado"
           a Los Picudos © para hacer su sistema de manejo interno.`}
          </Typography> */}
        </Grid>
      </Grid>
    );
  }
}

export default About;
