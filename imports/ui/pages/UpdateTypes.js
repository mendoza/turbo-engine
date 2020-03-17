/* eslint-disable react/jsx-wrap-multilines */
import React, { PureComponent } from "react";
import {
  Container,
  Button,
  IconButton,
  Grid,
  TextField,
  Snackbar,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  Divider,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import Tipos from "../../api/collections/Tipos/Tipos";
import Piezas from "../../api/collections/Piezas/Piezas";

class UpdateTypes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      name: "",
      open: false,
      message: "",
      id: "",
      selectedValue: "",
      Value: "",
      shouldRender: false,
      deletePiece: {},
    };
    if (props.location.state !== undefined) {
      const { tipos } = props.location.state;
      this.state = {
        nombre: tipos.nombre,
      };
    }
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

  handleDelete = () => {
    const { deletePiece } = this.state;
    let alert;
    if (Piezas.find({ tipo: deletePiece.nombre }).count() > 0) {
      alert = "No se puede eliminar tipos de pieza actualmente en uso";
    }
    if (alert) {
      this.setState({ shouldRender: false, open: true, message: alert });
    } else {
      Meteor.call("deleteTipo", {
        _id: deletePiece._id,
        nombre: deletePiece.nombre,
        icono: deletePiece.icono,
      });
      this.setState({ shouldRender: false, open: true, message: "Tipo eliminado exitosamente" });
    }
  };

  handleOpen = () => {
    const { deletePiece } = this.state;
    let alert;
    if (validator.isEmpty(deletePiece._id) === true) {
      alert = "La selección del tipo es requerido";
    }
    if (validator.isEmpty(deletePiece.nombre) === true) {
      alert = "La selección del tipo es requerido";
    }

    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      this.setState({ shouldRender: true });
    }
  };

  handleClick = () => {
    const { nombre, id, Value } = this.state;
    let alert;
    const name = Tipos.find({ _id: id }).fetch()[0].nombre;
    if (Piezas.find({ tipo: name }).count() > 0 && name !== nombre) {
      alert = "No se puede actualizar tipos de pieza actualmente en uso";
    }
    if (validator.isEmpty(id) === true) {
      alert = "La selección del tipo es requerido";
    }
    if (validator.isEmpty(nombre) === true) {
      alert = "El campo nombre es requerido";
    }
    if (Tipos.find({ nombre }).count() > 0 && name !== nombre) {
      alert = "El tipo ingresado ya existe";
    }
    if (validator.isEmpty(Value)) {
      alert = "La seleccion de icono es requerido";
    }

    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call("updateTipo", {
        _id: id,
        nombre,
        icono: Value,
      });
      this.setState({
        nombre: "",
        Value: "",
        open: true,
        id: "",
        message: "Tipo actualizado exitosamente",
      });
    }
  };

  handleAdd = () => {
    const { name, selectedValue } = this.state;
    let alert;
    console.log(selectedValue);

    if (validator.isEmpty(name)) {
      alert = "El campo nombre es requerido";
    }
    if (validator.isEmpty(selectedValue)) {
      alert = "La seleccion de icono es requerido";
    }
    if (Tipos.find({ nombre: name }).count() > 0) {
      alert = "El tipo ingresado ya existe";
    }
    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call("addTipo", {
        nombre: name,
        icono: selectedValue,
      });
      this.setState({
        open: true,
        message: "Tipo agregado exitosamente",
        name: "",
        selectedValue: "",
        shouldRender: false,
      });
    }
  };

  handleChange = event => {
    this.setState({
      selectedValue: event.target.value,
    });
  };

  render() {
    const {
      nombre,
      open,
      message,
      id,
      shouldRender,
      name,
      deletePiece,
      selectedValue,
      Value,
    } = this.state;
    const { tipos } = this.props;

    return (
      <DashboardLayout>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Title>Crear Tipos de Piezas</Title>
              </Grid>
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
              <Grid item xs={12}>
                <Typography>Seleccione un icono* </Typography>
                <RadioGroup
                  aria-label="position"
                  name="selectedValue"
                  value={selectedValue}
                  onChange={event => this.handleTextChange(event, "selectedValue")}
                  row>
                  <FormControlLabel
                    value="fas fa-car"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-car" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-compact-disc"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-compact-disc" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-lightbulb"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-lightbulb" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-gas-pump"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-gas-pump" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-toolbox"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-toolbox" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-tachometer-alt"
                    control={<Radio color="primary" />}
                    label={<i className="fas fa-tachometer-alt" />}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleAdd}>
                Crear
              </Button>
              <Grid item xs={12}>
                <Title>Actualizar Tipos de Piezas</Title>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Select
                  name="id"
                  fullWidth
                  required
                  label="Tipo"
                  id="type"
                  value={id}
                  onChange={event => this.handleTextChange(event, "id")}>
                  {tipos.map(tipoMap => {
                    if (tipoMap) {
                      return (
                        <MenuItem key={tipoMap._id} value={tipoMap._id}>
                          {tipoMap.nombre}
                        </MenuItem>
                      );
                    }
                    return <></>;
                  })}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="nombre"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Nuevo tipo"
                  value={nombre}
                  onInput={event => this.handleTextChange(event, "nombre")}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Seleccione un icono* </Typography>
                <RadioGroup
                  aria-label="position"
                  name="Value"
                  value={Value}
                  onChange={event => this.handleTextChange(event, "Value")}
                  row>
                  <FormControlLabel
                    value="fas fa-car"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-car" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-compact-disc"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-compact-disc" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-lightbulb"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-lightbulb" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-gas-pump"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-gas-pump" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-toolbox"
                    control={<Radio color="primary" />}
                    label={
                      <span style={{ fontSize: 20 }}>
                        <i className="fas fa-toolbox" />
                      </span>
                    }
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="fas fa-tachometer-alt"
                    control={<Radio color="primary" />}
                    label={<i className="fas fa-tachometer-alt" />}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleClick}>
                Actualizar
              </Button>
              <Grid item xs={12}>
                <Title>Eliminar Tipos de Piezas</Title>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Select
                  name="deletePiece"
                  fullWidth
                  required
                  label="Tipo"
                  id="type"
                  value={deletePiece}
                  onChange={event => this.handleTextChange(event, "deletePiece")}>
                  {tipos.map(tipoMap => {
                    if (tipoMap) {
                      return (
                        <MenuItem key={tipoMap._id} value={tipoMap}>
                          {tipoMap.nombre}
                        </MenuItem>
                      );
                    }
                    return <></>;
                  })}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button fullWidth variant="contained" color="primary" onClick={this.handleOpen}>
                  Eliminar Tipo
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        <Dialog open={shouldRender} onClose={this.handleClose}>
          <DialogTitle>Desea eliminar el tipo?</DialogTitle>
          <Divider />
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button onClick={this.handleDelete} fullwidth variant="contained" color="primary">
                  Eliminar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button onClick={this.handleDialog} fullwidth variant="contained" color="primary">
                  Cerrar
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
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
  Meteor.subscribe("Piezas.all");
  return {
    tipos: Tipos.find().fetch(),
  };
})(UpdateTypes);
