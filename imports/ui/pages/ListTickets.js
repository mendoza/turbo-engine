import React, { Component } from "react";
import {
  Grid,
  Snackbar,
  IconButton,
  TextField,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Input,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Redirect } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Reportes from "../../api/collections/Reportes/Reportes";
import Title from "../components/Title";
import Empleados from "../../api/collections/Empleados/Empleados";

class ListTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      searchByNames: "",
      pathname: "",
      selected: [],
      enabler: false,
      open: "",
      message: "",
      cambiar: true,
      ver: "Ver tickets cerrados",
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    let newSelected = [];
    let newEnabler = false;
    const index = selected.indexOf(id);
    if (index === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (index === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (index === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, selected.length - 1));
    } else if (index > 0) {
      newSelected = newSelected.concat(selected.slice(0, index), selected.slice(index + 1));
    }

    if (newSelected.length > 0) {
      newEnabler = true;
    }
    this.setState({
      selected: newSelected,
      enabler: newEnabler,
    });
  };

  handleButton = () => {
    const { selected, enabler } = this.state;
    if (!enabler) {
      this.setState({
        open: true,
        message: "Debe seleccionar un ticket mínimo",
      });
    } else {
      Meteor.call("updateReporte", { datos: selected });
      this.setState({
        open: true,
        message: "Reportes cerrados exitosamente",
        enabler: false,
        selected: [],
      });
    }
  };

  handleButtonReporteExcel = () => {
    const { reportes } = this.props;
    const realdata = reportes.map(reporte => {
      const { comentario, tipo, empleado, fecha, prioridad, abierto } = reporte;
      var estado;
      if (abierto == true) {
        estado = "Abierto";
      } else {
        estado = "Cerrado";
      }
      return {
        comentario,
        tipo,
        empleado: Meteor.users.findOne({ _id: reporte.empleado }).profile.firstName,
        fecha,
        prioridad,
        estado,
      };
    });
    var fechaHoy = "reporte_al_" + new Date().toLocaleDateString() + ".csv";
    console.log(fechaHoy);
    var csv = Papa.unparse(realdata);
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
    a.download = fechaHoy.toString();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  handleVer = () => {
    const { cambiar } = this.state;
    if (cambiar) {
      this.setState({
        cambiar: false,
        ver: "Ver tickets abiertos",
      });
    } else {
      this.setState({
        cambiar: true,
        ver: "Ver tickets cerrados",
      });
    }
  };

  renderTicketsTable = () => {
    const { reportes } = this.props;
    const { selected } = this.state;
    const { searchByNames, cambiar } = this.state;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell align="left">Prioridad</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Empleado</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Comentario</TableCell>
            <TableCell align="left">Abierto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map(row => {
            const searchRegex = new RegExp(
              searchByNames
                .split(/ /)
                .filter(l => l !== "")
                .join("|"),
              "i"
            );
            const r1 = row && row.tipo.search(searchRegex);
            const r2 = row && row.prioridad.search(searchRegex);
            const r3 = row && row.fecha.toString().search(searchRegex);
            const r4 = row && row.comentario.search(searchRegex);
            if (r1 === -1 && r2 === -1 && r3 === -1 && r4 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (row.abierto === cambiar) {
              const date = new Date(row.fecha);
              return (
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={event => this.handleClick(event, row._id)}
                      inputProps={{ "aria-labelledby": row.name }}
                      check={selected.includes(row._id)}
                    />
                  </TableCell>
                  <TableCell align="left">{row.prioridad}</TableCell>
                  <TableCell align="left">{`${date.toLocaleDateString()}`}</TableCell>
                  <TableCell align="left">{`${
                    Meteor.users.findOne({ _id: row.empleado }).profile.firstName
                  }`}</TableCell>
                  <TableCell align="left">{row.tipo}</TableCell>
                  <TableCell align="left">{row.comentario}</TableCell>
                  <TableCell align="left">
                    <i
                      className={`fas fa-${row.abierto ? "check" : "times"}`}
                      style={{ color: row.abierto ? "green" : "red" }}
                    />
                  </TableCell>
                </TableRow>
              );
            }
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
    const { shouldRedirect, pathname, open, message, ver } = this.state;
    return (
      <DashboardLayout style={{ height: "100vh" }}>
        <Title>Listado de Tickets</Title>
        <Grid container spacing={2} justify="left">
          <Grid item xs={12}>
            <TextField
              style={{ width: "50%" }}
              label="Filtro por Tipo, Prioridad, Fecha y Comentario"
              onInput={this.handleSearchName}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ pathname: "crearreportes", shouldRedirect: true });
              }}>
              Agregar Ticket
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleButton();
              }}>
              Cerrar Tickets Seleccionados
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleButtonReporteExcel();
              }}>
              Exportar a Excel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleVer();
              }}>
              {ver}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderTicketsTable()}
          </Grid>
        </Grid>
        {shouldRedirect ? <Redirect to={pathname} /> : null}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Reportes.all");
  Meteor.subscribe("empleados.all");
  //console.log(Reportes.find().fetch());
  return { reportes: Reportes.find().fetch() };
})(ListTickets);
