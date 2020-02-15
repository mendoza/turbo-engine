import React, { Component } from 'react'
import {
  Grid, 
  Snackbar, 
  IconButton, 
  Table, 
  TableRow, 
  TableHead, 
  TableCell, 
  Title
} from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import DashboardLayout from "../layouts/DashboardLayout";

class Historial extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderHistorialTable = () => {
    return (
      <Table aria-label="history table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>      
            <TableCell>Producto</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Teléfono de Trabajo</TableCell>
            <TableCell>Fecha de Venta</TableCell>
            <TableCell>Comentarios</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    );
  }

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
        onClose={
          () => { this.setState({ showSnackbar: false }) }
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{snackbarText}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => { this.setState({ showSnackbar: false }) }}
            >
            <i className="fas fa-times" />
          </IconButton>,
        ]}
        />
    );
  }

  render() {
    return (
      <DashboardLayout style={{ height: '100vh' }}>
        <Title>
            Historial de Ventas
        </Title>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderHistorialTable()}
          </Grid>
        </Grid>
        {this.renderSnackbar()}
      </DashboardLayout>
    )
  }
}

export default withTracker(() => {
})(Historial);
