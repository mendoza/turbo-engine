import React, { Component } from "react";
import {
  Grid,
  Snackbar,
  IconButton,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Reportes from "../../api/collections/Reportes/Reportes";

class ListTickets extends Component {
  renderTicketsTable = () => {
    const { reportes } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Prioridad</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Empleado</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Comentario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map(row => {
            console.log(Meteor.users.findOne({ _id: row.empleado }).profile.firstName);
            const date = new Date(row.fecha);
            return (
              <TableRow key={row.name}>
                <TableCell align="left">{row.prioridad}</TableCell>
                <TableCell align="left">{`${date.toLocaleDateString()}`}</TableCell>
                <TableCell align="left">{`${
                  Meteor.users.findOne({ _id: row.empleado }).profile.firstName
                }`}</TableCell>
                <TableCell align="left">{row.tipo}</TableCell>
                <TableCell align="left">{row.comentario}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  renderSnackbar = () => {
    const { showSnackbar, snackbarText } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          this.setState({ showSnackbar: false });
        }}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{snackbarText}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => {
              this.setState({ showSnackbar: false });
            }}>
            <i className="fas fa-times" />
          </IconButton>,
        ]}
      />
    );
  };

  render() {
    return (
      <DashboardLayout style={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderTicketsTable()}
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Reportes.all");
  console.log(Reportes.find().fetch());
  return { reportes: Reportes.find().fetch() };
})(ListTickets);
