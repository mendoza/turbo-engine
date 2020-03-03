import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Grid, TextareaAutosize } from "@material-ui/core";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";

class CreateReportes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  /*
    comentario: {type: String},
    tipoDeReporte: {type: String},
    idEmpleado: {type: String},
    fecha: {type: String}, 
    */

  render() {
    console.log(Meteor.user())

    return (
      <DashboardLayout>
        <Title>Reportes</Title>
        <Grid container>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            <p>wenas</p>
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }
}

export default CreateReportes;
