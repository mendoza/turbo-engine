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
import Proveedor from "../../api/collections/Proveedor/Proveedor";

class Proveedores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProviderDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      editId: undefined,
      searchByNames: '',
      snackbarText: '',
      Nombre: '',
      Apellido: '',
      Direccion: '',
      Telefono: '',
      Telefono2: '',
      Company: '',
      email: '',
    }

  }

  handleTextInput = (event, stateName, validator) => {
    let error;
    if (stateName === "email") {
      error = !validatorjs.isEmail(event.target.value);
      if (error) {
        error = "Correo no válido";
      }
    }
    console.log(stateName, validator);
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
  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value })
  }

  handleCreateProvider = event => {
    const { emailError } = this.state;
    event.preventDefault();
    const {
      Nombre, Apellido, Direccion, Telefono, Telefono2, Company, email, editId
    } = this.state;

    const newProvider = {
      _id: editId,
      nombre: Nombre,
      apellido: Apellido,
      direccion: Direccion,
      telefono: Telefono,
      telefonoTrabajo: Telefono2,
      compania: Company,
      email,
    };
    let methodName;
    if (editId) {
      methodName = "handleEditProvider";
    } else {
      methodName = "handleCreateProvider";
    }
    if (emailError) {
      this.setState({
        showSnackbar: true,
        snackbarText: "Por favor llene el campo de Correo Electrónico",
      });
    } else {
      Meteor.call(methodName, newProvider, error => {
        if (error) {
          this.setState({
            showSnackbar: true,
            snackbarText: "Ha ocurrido un error al intentar guardar el proveedor",
          });
        } else {
          this.setState({
            showProviderDialog: false,
            Nombre: "",
            Apellido: "",
            Direccion: "",
            Telefono: "",
            Telefono2: "",
            Company: "",
            email: "",
          });
        }
      });
    }
  };

  handleDeleteProvider = () => {
    const { editId } = this.state;
    Meteor.call("handleDeleteProvider", editId, error => {
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: "Ha ocurrido un error al eliminar el proveedor",
        });
      } else {
        this.setState({
          showDeleteDialog: false,
          showSnackbar: true,
          snackbarText: "Proveedor eliminado exitosamente",
        });
      }
    });
  };

  renderProviderDialog = () => {
    const {
      showProviderDialog,
      Nombre,
      Apellido,
      Direccion,
      Telefono,
      Telefono2,
      Company,
      email,
      editId,
      emailError,
    } = this.state;
    return (
      <Dialog
        open={showProviderDialog}
        onClose={() => {
          this.setState({ showProviderDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateProvider}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            proveedor
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
                <TextField
                  label="Dirección"
                  onInput={event => {
                    this.handleTextInput(event, "Direccion");
                  }}
                  value={Direccion}
                  required
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
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Teléfono secundario"
                  onInput={event => {
                    this.handleTextInput(event, "Telefono2", text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  value={Telefono2}
                  required
                  fullWidth
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
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {}
                <TextField
                  label="Compañía"
                  onInput={event => {
                    this.handleTextInput(event, "Company");
                  }}
                  value={Company}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showProviderDialog: false });
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
          ¿Está seguro que desea eliminar este proveedor?
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
          <Button color="primary" variant="contained" onClick={this.handleDeleteProvider}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  renderProviderTable = () => {
    const { providers } = this.props;
    const { searchByNames } = this.state;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Teléfono secundario</TableCell>
            <TableCell>Compañía</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map(provider => {
            const searchRegex = new RegExp(
              searchByNames.split(/ /).filter(l => l !== '').join('|'),
              'i'
            );
            const r1 = provider && provider.nombre.search(searchRegex);
            const r2 = provider && provider.apellido.search(searchRegex);
            if (r1 === -1 && r2 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (provider) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={provider.nombre}>
                  <TableCell component="th" scope="row">
                    {provider.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {provider.apellido}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {provider.direccion}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {provider.telefono}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {provider.telefonoTrabajo}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {provider.compania}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {provider.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              editId: provider._id,
                              showProviderDialog: true,
                              Nombre: provider.nombre,
                              Apellido: provider.apellido,
                              Direccion: provider.direccion,
                              Telefono: provider.telefono,
                              Telefono2: provider.telefonoTrabajo,
                              Company: provider.compania,
                              email: provider.email,
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
                              editId: provider._id,
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
                this.setState({ showProviderDialog: true, editId: undefined });
              }}>
              Agregar Proveedores
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderProviderTable()}
          </Grid>
        </Grid>
        {this.renderProviderDialog()}
        {this.renderSnackbar()}
        {this.renderDeleteDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("proveedores.all");
  const providers = Proveedor.find().fetch();
  return {
    providers: providers && providers.reverse(),
  };
})(Proveedores);
