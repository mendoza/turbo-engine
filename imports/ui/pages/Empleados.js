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
  InputLabel,
  MenuItem,
  Input,
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Empleados from "../../api/collections/Empleados/Empleados";
import MaskedTextField from "../components/MaskedTextField";

class Empleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmpleadoDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      searchByNames: '',
      editId: undefined,
      snackbarText: "",
      Nombre: "",
      Apellido: "",
      RTN: "",
      Telefono: "",
      email: "",
    };
  }
  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value })
  }

  handleTextInput = (event, stateName, validator) => {
    let error;
    if (stateName === "email") {
      error = !validatorjs.isEmail(event.target.value);
      if (error) {
        error = "Correo no válido";
      }
    }
    if (validator) {
      if (validator(event.target.value) || event.target.value === "") {
        this.setState({
          [stateName]: event.target.value,
        });
      }
    } else {
      this.setState({
        [stateName]: event.target.value,
        emailError: error,
      });
    }
  };

  handleCreateEmpleado = event => {
    event.preventDefault();
    const { Nombre, Apellido, RTN, Telefono, email, editId, emailError } = this.state;
    const newEmpleado = {
      _id: editId,
      nombre: Nombre,
      apellido: Apellido,
      rtn: RTN,
      telefono: Telefono,
      email,
    };
    let methodName;
    if (editId) {
      methodName = "handleEditEmpleado";
    } else {
      methodName = "handleCreateEmpleado";
    }
    if (emailError) {
      this.setState({
        showSnackbar: true,
        snackbarText: "Por favor llene el campo de Correo Electrónico",
      });
    } else {
      Meteor.call(methodName, newEmpleado, (error, received) => {
        if (error) {
          this.setState({
            showSnackbar: true,
            snackbarText: 'Ha ocurrido un error al intentar guardar el empleado'
          });
        } else if (received) {
            this.setState({
              showEmpleadoDialog: false,
              Nombre: '',
              Apellido: '',
              RTN: '',
              Telefono: '',
              email: '',
            });
          } else {
            this.setState({
              showSnackbar: true,
              snackbarText: 'El RTN ya existe'
            });
          }
      });
    }
  };

  handleDeleteEmpleado = () => {
    const { editId } = this.state;
    Meteor.call("handleDeleteEmpleado", editId, error => {
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: "Ha ocurrido un error al eliminar el empleado",
        });
      } else {
        this.setState({
          showDeleteDialog: false,
          showSnackbar: true,
          snackbarText: "Empleado eliminado exitosamente",
        });
      }
    });
  };

  renderEmpleadoDialog = () => {
    const {
      showEmpleadoDialog,
      Nombre,
      Apellido,
      RTN,
      Telefono,
      email,
      editId,
      emailError,
    } = this.state;
    return (
      <Dialog
        open={showEmpleadoDialog}
        onClose={() => {
          this.setState({ showEmpleadoDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateEmpleado}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            empleado
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre"
                  onInput={event => {
                    this.handleTextInput(event, "Nombre", text => {
                      return validatorjs.isAlpha(text, "es-ES");
                    });
                  }}
                  value={Nombre}
                  required
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Apellido"
                  onInput={event => {
                    this.handleTextInput(event, "Apellido", text => {
                      return validatorjs.isAlpha(text, "es-ES");
                    });
                  }}
                  value={Apellido}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <MaskedTextField
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  value={RTN}
                  name="RTN"
                  onChange={event => {
                    this.handleTextInput(event, "RTN", text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  label="RTN"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Teléfono"
                  onInput={event => {
                    this.handleTextInput(event, "Telefono", text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  value={Telefono}
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Correo Electrónico"
                  onInput={event => {
                    this.handleTextInput(event, "email");
                  }}
                  value={email}
                  error={!!emailError}
                  helperText={emailError || ""}
                  //required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showEmpleadoDialog: false });
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
          ¿Está seguro que desea eliminar este empleado?
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
          <Button color="primary" variant="contained" onClick={this.handleDeleteEmpleado}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderEmpleadoTable = () => {
    const { empleados } = this.props;
    const { searchByNames } = this.state;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>RTN</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map(empleado => {
             const searchRegex = new RegExp(
              searchByNames.split(/ /).filter(l => l !== '').join('|'),
              'i'
            );
            const r1 = empleado && empleado.nombre.search(searchRegex);
            const r2 = empleado && empleado.apellido.search(searchRegex);
            if (r1 === -1 && r2 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (empleado) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={empleado.nombre}>
                  <TableCell component="th" scope="row">
                    {empleado.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {empleado.apellido}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {empleado.rtn}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {empleado.telefono}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {empleado.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              editId: empleado._id,
                              showEmpleadoDialog: true,
                              Nombre: empleado.nombre,
                              Apellido: empleado.apellido,
                              RTN: empleado.rtn,
                              Telefono: empleado.telefono,
                              email: empleado.email,
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
                              editId: empleado._id,
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
            <TextField
              style={{ width: '50%' }}
              label="Filtro por Nombre y Apellido"
              onInput={this.handleSearchName}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ showEmpleadoDialog: true, editId: undefined });
              }}>
              Agregar Empleado
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderEmpleadoTable()}
          </Grid>
        </Grid>
        {this.renderEmpleadoDialog()}
        {this.renderSnackbar()}
        {this.renderDeleteDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("empleados.all");
  const empleados = Empleados.find().fetch();
  return {
    empleados: empleados && empleados.reverse(),
  };
})(Empleado);
