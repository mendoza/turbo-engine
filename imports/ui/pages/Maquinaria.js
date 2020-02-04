import React, { Component } from "react";
import validatorjs from "validator";
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
import Maquina from "../../api/collections/Maquina/Maquina";

class Maquinaria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMaquinariaDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      editId: undefined,
      snackbarText: "",
      Tipo: "",
      Marca: "",
      Cantidad: "",
      Especificaciones: "",
    };
  }

  handleTextInput = (event, stateName, validator) => {
    let error;
    if (stateName === 'cantidad') {
      error = !validatorjs.isNumeric(event.target.value);
      if (error) {
        error = 'cantidad no válida';
      }
    }
    if (validator) {
      if (validator(event.target.value) || event.target.value === '') {
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

  handleCreateMaquina = event => {
    event.preventDefault();
    const { Tipo, Marca, Cantidad, Especificaciones, cantidadError } = this.state;
    const newMaquina = {
      _id: editId,
      tipo: Tipo,
      marca: Marca,
      cantidad: Cantidad,
      especificaciones: Especificaciones,
    };
    let methodName;
    if (editId) {
      methodName = "handleEditMaquina";
    } else {
      methodName = "handleCreateMaquina";
    }
    if (cantidadError) {
      this.setState({
        showSnackbar: true,
        snackbarText: "Por favor ingrese una cantidad correcta",
      });
    } else {
      Meteor.call(methodName, newMaquina, error => {
        if (error) {
          this.setState({
            showSnackbar: true,
            snackbarText: "Ha ocurrido un error al intentar guardar el elemento",
          });
        } else {
          this.setState({
            showMaquinariaDialog: false,
            Tipo: "",
            Marca: "",
            Cantidad: "",
            Especificaciones: "",
          });
        }
      });
    }
  };

  handleDeleteMaquina = () => {
    const { editId } = this.state;
    Meteor.call("handleDeleteMaquina", editId, error => {
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
    const {
      showMaquinariaDialog,
      Tipo,
      Marca,
      Cantidad,
      Especificaciones,
      editId,
      cantidadError,
    } = this.state;
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
                      return validatorjs.isAlpha(text, "es-ES");
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
                      return validatorjs.isAlpha(text, "es-ES");
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
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  value={Cantidad}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Especificaciones"
                  onInput={event => {
                    this.handleTextInput(event, "Especificaciones", text => {
                      return validatorjs.isAlpha(text, "es-ES");
                    });
                  }}
                  value={Especificaciones}
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
            <Button color="primary" variant="contained" type="submit">
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
    const { maquinaria } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Especificaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maquinaria.map(maquina => {
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
                    {maquina.especificaciones}
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
                              Especificaciones: maquina.especificaciones,
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
  Meteor.subscribe("maquinaria.all");
  const maquinaria = Maquina.find().fetch();
  return {
    maquinaria: maquinaria && maquinaria.reverse(),
  };
})(Maquinaria);
