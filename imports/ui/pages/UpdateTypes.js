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
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import Tipos from "../../api/collections/Tipos/Tipos";

class UpdateTypes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      open: false,
      message: "",
      id: "",
      shouldRender: false,
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
    const { nombre, id } = this.state;
    Meteor.call("deleteTipo", {
      _id: id,
      nombre,
    });
    this.setState({ shouldRender: false });
  };

  handleOpen = () => {
    const { id } = this.state;
    let alert;
    if (validator.isEmpty(id) === true) {
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
    const { nombre, id } = this.state;
    let alert;
    if (validator.isEmpty(id) === true) {
      alert = "La selección del tipo es requerido";
    }
    if (validator.isEmpty(nombre) === true) {
      alert = "El campo nombre es requerido";
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
      });
      this.setState({
        nombre: "",
        open: true,
        message: "Tipo actualizado exitosamente",
      });
    }
  };

  render() {
    const { nombre, open, message, id, shouldRender } = this.state;
    const { tipos } = this.props;
    return (
      <DashboardLayout>
        <Container>
          <Title>Actualizar Tipos</Title>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10}>
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
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="default"
                  // size="large"
                  // onClick={() => {
                  //   this.setState({ shouldRender: true });
                  // }}>
                  onClick={this.handleOpen}>
                  Eliminar Tipo
                </Button>
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
                  autoFocus
                  value={nombre}
                  onInput={event => this.handleTextChange(event, "nombre")}
                />
              </Grid>
              <Button fullWidth variant="contained" color="primary" onClick={this.handleClick}>
                Actualizar
              </Button>
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
  return {
    tipos: Tipos.find().fetch(),
  };
})(UpdateTypes);
