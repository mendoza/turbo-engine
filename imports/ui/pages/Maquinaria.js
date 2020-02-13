import React, { Component } from "react";
import validator from "validator";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Snackbar,
  IconButton,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Maquinas from "../../api/collections/Maquinas/Maquinas";

class Maquinaria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMaquinariaDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      snackbarText: "",

      editId: undefined,
      Tipo: "",
      Marca: "",
      Cantidad: "",
      Descripcion: "",
    };
  }

  // Acá es donde tiene que haber máscara para cantidad
  // También mascara para cuando estén vacios
  handleTextInput = (event, stateName) => {
    let error;

    if (stateName === "cantidad") {
      // Acá meron
      error = !validator.isNumeric(event.target.value);
      if (error) {
        error = "cantidad no válida";
      }
    }
    if (error) {
      if (validator.isEmpty(event.target.value) || event.target.value === "") {
        this.setState({
          [stateName]: event.target.value,
        });
      }
    } else {
      this.setState({
        [stateName]: event.target.value,
        cantidadError: error,
      });
    }
  };

  /* Se crea el nuevo objeto máquina */
  handleCreateMaquina = event => {
    event.preventDefault();
    const { Tipo, Marca, Cantidad, Descripcion, editId, cantidadError } = this.state;
    const newMaquina = {
      _id: editId,
      tipo: Tipo,
      marca: Marca,
      cantidad: Cantidad,
      descripcion: Descripcion,
    };
    let methodName;
    let error;
    if (editId) {
      methodName = "editMaquina";
    } else {
      methodName = "addMaquina";
    }
    if (cantidadError) {
      this.setState({
        showSnackbar: true,
        snackbarText: "Por favor ingrese una cantidad correcta",
      });
    } else {
      if (validator.isEmpty(Tipo)) {
        error = "El campo Tipo es requerido";
      }
      if (validator.isEmpty(Marca)) {
        error = "El campo Marca es requerido";
      }
      if (validator.isEmpty(Cantidad)) {
        error = "El campo Cantidad es requerido";
      }
      if (validator.isEmpty(Descripcion)) {
        error = "El campo Descripción es requerido";
      }
      if (!validator.isNumeric(Cantidad)) {
        error = "El campo cantidad solo debe contener números";
      } else if (Cantidad < 1) {
        error = "La cantidad no puede ser cero o un número negativo";
      }
      if (Maquinas.find({Tipo}).count()>0 &&  Maquinas.find({Marca}).count()>0){
        // Autos.find({ placa }).count() > 0
        error = "Este elemento ya ha sido agregado con anterioridad"
      }
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: error,
        });
        return;
      }

      Meteor.call(methodName, newMaquina, err => {
        if (err) {
          this.setState({
            showSnackbar: true,
            snackbarText: "Ha ocurrido un error al intentar guardar el elemento",
          });
        } else {
          this.setState({
            Tipo: "",
            Marca: "",
            Cantidad: "",
            Descripcion: "",
            showMaquinariaDialog: false,
          });
        }
      });
    }
  };

  /*
  handleCreateMaquina = () => {
    const { Tipo, Marca, Cantidad, Especificaciones} = this.state;
    let alert;
    if (validator.isEmpty(Tipo)) {
      alert = "El campo Tipo es requerido";
    }
    if (validator.isEmpty(Marca)) {
      alert = "El campo Marca es requerido";
    }
    if (validator.isEmpty(Cantidad)) {
      alert = "El campo Cantidad es requerido";
    }
    if (validator.isEmpty(Especificaciones)) {
      alert = "El campo Especificaciones es requerido";
    }
    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call(
        "addMaquina",
        {
          tipo: Tipo,
          marca: Marca,
          cantidad: Cantidad,
          especificaciones: Especificaciones,
        }
      );
    }
  };
*/

  handleDeleteMaquina = () => {
    const { editId } = this.state;
    Meteor.call("deleteMaquina", editId, error => {
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: "Ha ocurrido un error al eliminar el elemento",
        });
      } else {
        this.setState({
          showDeleteDialog: false,
          showSnackbar: true,
          snackbarText: "Elemento eliminado exitosamente",
        });
      }
    });
  };

  renderMaquinaDialog = () => {
    const { showMaquinariaDialog, Tipo, Marca, Cantidad, Descripcion, editId } = this.state;
    return (
      <Dialog
        open={showMaquinariaDialog}
        onClose={() => {
          this.setState({ showMaquinariaDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateMaquina}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            Maquina
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tipo"
                  onInput={event => {
                    this.handleTextInput(event, "Tipo", text => {
                      return validator.isAlpha(text, "es-ES");
                    });
                  }}
                  value={Tipo}
                  required
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Marca"
                  onInput={event => {
                    this.handleTextInput(event, "Marca", text => {
                      return validator.isAlpha(text, "es-ES");
                    });
                  }}
                  value={Marca}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Cantidad"
                  onInput={event => {
                    this.handleTextInput(event, "Cantidad", text => {
                      return validator.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  value={Cantidad}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Descripción"
                  onInput={event => {
                    this.handleTextInput(event, "Descripcion", text => {
                      return validator.isAlpha(text, "es-ES");
                    });
                  }}
                  value={Descripcion}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showMaquinariaDialog: false });
              }}
              color="primary"
              variant="contained">
              Cancelar
            </Button>
            <Button color="primary" variant="contained" onClick={this.handleCreateMaquina}>
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  renderDeleteDialog = () => {
    const { showDeleteDialog } = this.state;
    return (
      <Dialog
        open={showDeleteDialog}
        onClose={() => {
          this.setState({ showDeleteDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          ¿Está seguro que desea eliminar este elemento?
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              Esta acción es irreversible.
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ showDeleteDialog: false });
            }}
            color="primary"
            variant="contained">
            Cancelar
          </Button>
          <Button color="primary" variant="contained" onClick={this.handleDeleteMaquina}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderMaquinaTable = () => {
    const { maquinas } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Descripción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maquinas.map(maquina => {
            if (maquina) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={maquina.tipo}>
                  <TableCell component="th" scope="row">
                    {maquina.tipo}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {maquina.marca}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {maquina.cantidad}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {maquina.descripcion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              editId: maquina._id,
                              showMaquinariaDialog: true,
                              Tipo: maquina.tipo,
                              Marca: maquina.marca,
                              Cantidad: maquina.cantidad,
                              Descripcion: maquina.descripcion,
                            });
                          }}
                          aria-label="centered">
                          <i className="fas fa-pen" />
                        </ToggleButton>
                        <ToggleButton
                          value="right"
                          aria-label="right aligned"
                          onClick={() => {
                            this.setState({
                              editId: maquina._id,
                              showDeleteDialog: true,
                            });
                          }}>
                          <i className="fas fa-trash" />
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ showMaquinariaDialog: true, editId: undefined });
              }}>
              Agregar Elemento
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderMaquinaTable()}
          </Grid>
        </Grid>
        {this.renderMaquinaDialog()}
        {this.renderSnackbar()}
        {this.renderDeleteDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Maquinas.all");
  const maquinas = Maquinas.find().fetch();
  return {
    maquinas: maquinas && maquinas.reverse(),
  };
})(Maquinaria);