import React, { PureComponent } from "react";
import {
  Container,
  Button,
  IconButton,
  Grid,
  TextField,
  Snackbar,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import Tipos from "../../api/collections/Tipos/Tipos";

class CreatePiezas extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      marca: "",
      vendedor: "",
      precio: "",
      numeroDeSerie: "",
      tipo: "",
      cantidad: "",
      open: false,
      message: "",
      shouldRender: false,
      name: "",
    };
  }

  handleDialog = () => {
    this.setState({ shouldRender: false });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  handleClick = () => {
    const { marca, vendedor, precio, numeroDeSerie, tipo, cantidad } = this.state;
    let alert;

    if (validator.isEmpty(marca)) {
      alert = "El campo marca es requerido";
    }
    if (validator.isEmpty(tipo)) {
      alert = "El campo tipo es requerido";
    }
    if (validator.isEmpty(precio)) {
      alert = "El campo precio es requerido";
    }
    if (validator.isEmpty(numeroDeSerie)) {
      alert = "El numero de serie es requerido";
    }
    if (validator.isEmpty(vendedor)) {
      alert = "El campo vendedor es requerido";
    }
    if (validator.isEmpty(cantidad)) {
      alert = "El campo cantidad es requerido";
    }
    if (!validator.isNumeric(precio)) {
      alert = "El campo precio solo debe contener números";
    } else if (precio < 1) {
      alert = "El precio no puede ser cero o un número negativo";
    }
    if (!validator.isNumeric(cantidad)) {
      alert = "El campo cantidad solo debe contener números";
    } else if (cantidad < 1) {
      alert = "La cantidad no puede ser cero o un número negativo";
    }
    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call("addPieza", {
        marca,
        vendedor,
        precio,
        numeroDeSerie,
        tipo,
        cantidad,
      });
      this.setState({
        open: true,
        message: "Pieza agregada exitosamente",
        marca: "",
        vendedor: "",
        precio: "",
        numeroDeSerie: "",
        tipo: "",
        cantidad: "",
      });
    }
  };

  handleAdd = () => {
    const { name } = this.state;
    let alert;
    if (validator.isEmpty(name)) {
      alert = "El campo nombre es requerido";
    }
    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call("addTipo", {
        nombre: name,
      });
      this.setState({
        open: true,
        message: "Tipo agregado exitosamente",
        name: "",
        shouldRender: false,
      });
    }
  };

  render() {
    const {
      marca,
      vendedor,
      precio,
      numeroDeSerie,
      tipo,
      cantidad,
      open,
      message,
      shouldRender,
      name,
    } = this.state;
    const { tipos } = this.props;
    return (
      <DashboardLayout>
        <Container>
          <Title>Agregar Piezas</Title>
          <form id="formUserLogin" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="brand"
                  name="marca"
                  variant="outlined"
                  required
                  fullWidth
                  id="Brand"
                  label="Marca"
                  autoFocus
                  value={marca}
                  onInput={event => this.handleTextChange(event, "marca")}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="seller"
                  name="vendedor"
                  variant="outlined"
                  required
                  fullWidth
                  id="Seller"
                  label="Vendedor"
                  value={vendedor}
                  onInput={event => this.handleTextChange(event, "vendedor")}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="serieNum"
                  name="numeroDeSerie"
                  variant="outlined"
                  required
                  fullWidth
                  id="SerieNumber"
                  label="NumeroDeSerie"
                  value={numeroDeSerie}
                  onInput={event => this.handleTextChange(event, "numeroDeSerie")}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="price"
                  name="precio"
                  variant="outlined"
                  required
                  fullWidth
                  id="Price"
                  label="precio"
                  value={precio}
                  onInput={event => this.handleTextChange(event, "precio")}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="quantity"
                  name="cantidad"
                  variant="outlined"
                  required
                  fullWidth
                  id="Quantity"
                  label="cantidad"
                  value={cantidad}
                  onInput={event => this.handleTextChange(event, "cantidad")}
                  />
              </Grid>
              <Grid item xs={12} sm={10}>
                <Select
                  fullWidth
                  required
                  label="Tipo"
                  id="type"
                  value={tipo}
                  onChange={event => this.handleTextChange(event, "tipo")}
                  >
                  {tipos.map(tipoMap => {
                    if (tipoMap) {
                      return (
                        <MenuItem key={tipoMap._id} value={tipoMap.nombre}>
                          {tipoMap.nombre}
                        </MenuItem>
                      );
                    }
                    return <></>;
                  })}
                </Select>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="default"
                  // size="large"
                  onClick={() => {
                    this.setState({ shouldRender: true });
                  }}
                  >
                  Agregar Tipo
                </Button>
              </Grid>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleClick}>
                Crear
              </Button>
            </Grid>
          </form>
        </Container>
        <Dialog open={shouldRender} onClose={this.handleDialog}>
          <DialogTitle>Agregar Tipo</DialogTitle>
          <Divider />
          <DialogContent dividers>
            <form id="formUserLogin" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="Name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    label="Nombre"
                    autoFocus
                    value={name}
                    onInput={event => this.handleTextChange(event, "name")}
                    />
                </Grid>
                <Button fullWidth variant="contained" color="primary" onClick={this.handleAdd}>
                  Crear
                </Button>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
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
  Meteor.subscribe("Tipos.all");
  return {
    tipos: Tipos.find().fetch(),
  };
})(CreatePiezas);
