/* eslint-disable jsx-a11y/anchor-is-valid */
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
import Link from "@material-ui/core/Link";
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

      // Para el cliente
      showClientDialog: false,
      Nombre: "",
      Apellido: "",
      RTN: "",
      Telefono: "",
      Telefono2: "",
      Company: "",
      email: "",
      clientType: "",

      // Para el auto
      showAutoDialog: false,
      Marca: "",
      Modelo: "",
      Tipo: "",
      Transmision: "",
      Color: "",
      Placa: "",
      Traccion: "",
      Year: "",
    };
  }

  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value });
  };

  renderAutoDialog = () => {
    const {
      showAutoDialog,
      Marca,
      Modelo,
      Tipo,
      Transmision,
      Color,
      Placa,
      Traccion,
      Year,
    } = this.state;

    // Tipo
    let labelTipo = "";
    if (Tipo === 0) {
      labelTipo = "Camioneta";
    } else if (Tipo === 1) {
      labelTipo = "Turismo";
    } else if (Tipo === 2) {
      labelTipo = "Deportivo";
    }

    // Transmisión
    let labelTransmision = "";
    if (Transmision === 0) {
      labelTransmision = "Manual";
    } else if (Transmision === 1) {
      labelTransmision = "Automático";
    } else if (Transmision === 2) {
      labelTransmision = "Mixta";
    }

    // Tracción
    let labelTraccion = "";
    if (Traccion === 0) {
      labelTraccion = "Trasera";
    } else if (Traccion === 1) {
      labelTraccion = "Delantera";
    } else if (Traccion === 2) {
      labelTraccion = "Doble";
    }

    return (
      <Dialog
        style={{ overflow: "initial" }}
        open={showAutoDialog}
        onClose={() => {
          this.setState({ showAutoDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateClient}>
          <DialogTitle id="form-dialog-title">Cliente</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Title>Marca</Title>
                {Marca}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Modelo</Title>
                {Modelo}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Tipo</Title>
                {labelTipo}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Transmisión</Title>
                {labelTransmision}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Color</Title>
                {Color}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Placa</Title>
                {Placa}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Tracción</Title>
                {labelTraccion}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Año</Title>
                {Year}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showAutoDialog: false });
                this.setState({
                  showAutoDialog: false,
                  Marca: "",
                  Modelo: "",
                  Tipo: "",
                  Transmision: "",
                  Color: "",
                  Placa: "",
                  Traccion: "",
                  Year: "",
                });
              }}
              color="primary"
              variant="contained">
              Cerrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  renderClientDialog = () => {
    const {
      showClientDialog,
      Nombre,
      Apellido,
      RTN,
      Telefono,
      Telefono2,
      Company,
      email,
      clientType,
    } = this.state;

    return (
      <Dialog
        style={{ overflow: "initial" }}
        open={showClientDialog}
        onClose={() => {
          this.setState({ showClientDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateClient}>
          <DialogTitle id="form-dialog-title">Cliente</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Title>Nombre</Title>
                {Nombre}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Apellido</Title>
                {Apellido}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>RTN</Title>
                {RTN}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Telefono</Title>
                {Telefono}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Telefono secundario</Title>
                {Telefono2}
              </Grid>
              <Grid item xs={12} md={6}>
                <Title>Correo electrónico</Title>
                {email}
              </Grid>
              {clientType === "Juridico" ? (
                <Grid item xs={12} md={6}>
                  <Title>Compañia</Title>
                  {Company}
                </Grid>
              ) : (
                <div></div>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showClientDialog: false });
                this.setState({
                  showClientDialog: false,
                  Nombre: "",
                  Apellido: "",
                  RTN: "",
                  Telefono: "",
                  Telefono2: "",
                  Company: "",
                  email: "",
                  clientType: "",
                });
              }}
              color="primary"
              variant="contained">
              Cerrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
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
              L.
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
            // eslint-disable-next-line no-console
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
            const r1 = row && cliente.nombre.search(searchRegex);
            const r2 = row && row.fecha.toString().search(searchRegex);
            if (r1 === -1 && r2 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (row) {
              return (
                <TableRow key={row._id}>
                  <TableCell>
                    <Link
                      color="#3b7fed"
                      href="#"
                      onClick={() => {
                        this.setState({
                          showClientDialog: true,
                          Nombre: cliente.nombre,
                          Apellido: cliente.apellido,
                          RTN: cliente.rtn,
                          Telefono: cliente.telefono,
                          Telefono2: cliente.telefonoTrabajo,
                          Company: cliente.compania,
                          email: cliente.email,
                          clientType: cliente.clientType,
                        });
                      }}>
                      {`${cliente.nombre} ${cliente.apellido}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      color="#3b7fed"
                      href="#"
                      onClick={() => {
                        this.setState({
                          showAutoDialog: true,
                          Marca: auto.marca,
                          Modelo: auto.modelo,
                          Tipo: auto.tipo,
                          Transmision: auto.transmision,
                          Color: auto.color,
                          Placa: auto.placa,
                          Traccion: auto.traccion,
                          Year: auto.year,
                        });
                      }}>
                      {`${auto.marca} ${auto.modelo} con placa ${auto.placa}`}
                    </Link>
                  </TableCell>
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
                              tipoPago: row.tipo,
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
        {this.renderClientDialog()}
        {this.renderAutoDialog()}
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
    autos: Autos.find({}).fetch(),
    clientes: Clientes.find({}).fetch(),
  };
})(Historial);
