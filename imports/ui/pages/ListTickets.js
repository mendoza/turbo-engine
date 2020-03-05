import React, { Component } from "react";
import {
  Grid,
  Snackbar,
  IconButton,
  Table,
  TableRow,
  TableHead,
  TableCell,
} from "@material-ui/core";

import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";

class ListTickets extends Component {

  renderTicketsTable = () => {
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Prioridad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Detalles</TableCell>
          </TableRow>
        </TableHead>
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
            }}
            >
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

export default ListTickets;