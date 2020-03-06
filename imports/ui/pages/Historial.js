import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Snackbar,
  IconButton,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import Title from "../components/Title";
import DashboardLayout from "../layouts/DashboardLayout";

import Clientes from "../../api/collections/Cliente/Cliente"
import Autos from "../../api/collections/Autos/Autos";
import Historiales from "../../api/collections/Historial/Historial"

class Historial extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showSnackbar: false, 
      snackbarText: "",
      showHistorialDialog: false,

      Cliente: "",
      Producto: "",
      Fecha: "",
      Comentario: "",

    };
  }


  renderHistorialDialog = () => {
    const {
      showHistorialDialog,
      Cliente,
      Producto,
      Fecha,
      Comentario,
    } = this.state;

    return (
      <Dialog
        style={{ overflow: "initial" }}
        open={showHistorialDialog}
        onClose={() => {
          this.setState({ showHistorialDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          Venta
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cliente"
                value={Cliente}
                required
                autoFocus
                fullWidth
               />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Producto"
                value={Producto}
                required
                fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha"
                value={Fecha}
                fullWidth
                required
                />
            </Grid>
            <Grid item xs={12} md={6}>
                
              {/* Acá va el comentario */}
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Acá va el boton de subir las imagenes */}
            </Grid>
  
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ showHistorialDialog: false });
              this.setState({
                showHistorialDialog: false,
                Cliente: "",
                Producto: "",
                Fecha: "",
                Comentario: "",
              });
            }}
            color="primary"
            variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderHistorialTable = () => {
    const { historial } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map(row => {
            const fecha = new Date(row.fecha);
            const cliente = Clientes.findOne({ _id: row.cliente });
            const auto = Autos.findOne({ _id: row.producto });
            if (cliente !== undefined && auto !== undefined && fecha !== undefined)
              return (
                <TableRow key={row.cliente}>
                  <TableCell>{`${cliente.nombre} ${cliente.apellido}`}</TableCell>
                  <TableCell>{`${auto.marca} ${auto.modelo} con placa ${auto.placa}`}</TableCell>
                  <TableCell>{fecha.toLocaleDateString("en-US")}</TableCell>                  

                  <TableCell>
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              showHistorialDialog: true,
                              Cliente: `${cliente.nombre} ${cliente.apellido}`,
                              Producto: `${auto.marca} ${auto.modelo} con placa ${auto.placa}`,
                              Fecha: fecha.toLocaleDateString("en-US"),
                              Comentario: row.comentario,
                            });
                          }}
                          aria-label="centered">
                          <i className="fas fa-info" />
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </TableCell>


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
        <Title>Historial de Ventas de autos</Title>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderHistorialTable()}
          </Grid>
        </Grid>
        {this.renderSnackbar()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("historial.all");
  return {
    historial: Historiales.find({}).fetch(),
  };
})(Historial);
