import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Encuestas from "../../api/collections/Encuestas/Encuestas";

class EncuestaPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: false,

    };
  }


  renderEncuestasTable = () => {
    const { encuestas } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Puntuación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encuestas.map(encuesta => {
            if (encuesta) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={encuesta.tipo}>
                  <TableCell component="th" scope="row">
                    {encuesta.fecha}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {encuesta.score}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="left"
                          onClick={() => {
                            this.setState({ shouldRender: true, dialogUser: user });
                          }}
                          aria-label="left aligned">
                          <i className="fas fa-address-card" />
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
            return <></>;
          })}
        </TableBody>
      </Table>
    );
  };

  render() {
    return (
      <DashboardLayout style={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderEncuestasTable()}
          </Grid>
        </Grid>
        {this.renderEncuestaDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("encuestas.all");
  const encuestas = Encuestas.find().fetch();
  return {
    maquinas: encuestas && encuestas.reverse(),
  };
})(EncuestaPage);
