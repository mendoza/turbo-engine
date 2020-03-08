import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Divider,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import Title from "../components/Title";
import DashboardLayout from "../layouts/DashboardLayout";

import Clientes from "../../api/collections/Cliente/Cliente";
import Autos from "../../api/collections/Autos/Autos";
import Historiales from "../../api/collections/Historial/Historial";

class Historial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistorialDialog: false,
      searchByNames: "",
      Cliente: "",
      Producto: "",
      Fecha: "",
      Comentario: "",
      Monto: "",
      tipoPago: "",
    };
  }

  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value });
  };

  renderHistorialDialog = () => {
    const {
      showHistorialDialog,
      Cliente,
      Producto,
      Fecha,
      Comentario,
      Monto,
      tipoPago,
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
        <DialogTitle id="form-dialog-title">Venta</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Title>Cliente</Title>
              {Cliente}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Producto</Title>
              {Producto}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Fecha</Title>
              {Fecha}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Monto</Title>
              {Monto}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Tipo de pago</Title>
              {tipoPago}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Comentario</Title>
              {Comentario}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ showHistorialDialog: false });
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
    const { searchByNames } = this.state;
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
            console.log(row);
            const fecha = new Date(row.fecha);
            let cliente;
            const auto = Autos.findOne({ _id: row.producto });
            if (row.cliente !== "0") {
              cliente = Clientes.findOne({ _id: row.cliente });
            } else {
              cliente = { nombre: "Cliente", apellido: "Final" };
            }
            const searchRegex = new RegExp(
              searchByNames
                .split(/ /)
                .filter(l => l !== "")
                .join("|"),
              "i"
            );
            const r1 = row && row.cliente.search(searchRegex);
            const r2 = row && row.fecha.toString().search(searchRegex);
            if (r1 === -1 && r2 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (row) {
              return (
                <TableRow key={row._id}>
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
                              Monto: row.monto,
                              tipoPago: row.tipo
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
        <Title>Historial de Ventas de autos</Title>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ width: "50%" }}
              label="Filtro por Nombre y Apellido"
              onInput={this.handleSearchName}
            />
            {this.renderHistorialTable()}
          </Grid>
        </Grid>
        {this.renderHistorialDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("historial.all");
  Meteor.subscribe("Autos.all");
  Meteor.subscribe("clientes.all");
  return {
    historial: Historiales.find({}).fetch(),
  };
})(Historial);
