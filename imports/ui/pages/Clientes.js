import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
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
import Select from "react-select";
import DashboardLayout from "../layouts/DashboardLayout";
import Cliente from "../../api/collections/Cliente/Cliente";
import MaskedTextField from "../components/MaskedTextField";
import Autos from "../../api/collections/Autos/Autos";

const CeldaAuto = ({ autos }) => (
  <TableCell component="th" scope="row">
    {autos.map(auto => {
      {
      }
    })}
  </TableCell>
);
withTracker(clientesAutos => {
  Meteor.subscribe("Autos.cliente", clientesAutos);
  return {
    autos: Autos.find().fetch(),
  };
})(CeldaAuto);

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClientDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      editId: undefined,
      searchByNames: "",
      snackbarText: "",
      Nombre: "",
      Apellido: "",
      RTN: "",
      Telefono: "",
      Telefono2: "",
      Company: "",
      email: "",
      autos: [],
      clientType: "",
    };
  }

  handleClientTypeChange = event => {
    this.setState({
      clientType: event.value,
    });
    console.log(event.value);
  };

  handleTextInput = (event, stateName, validatorjs) => {
    let error;
    if (stateName === "email") {
      error = !validator.isEmail(event.target.value);
      if (error) {
        error = "Correo no válido";
      }
    }
    if (validatorjs) {
      if (validatorjs(event.target.value) || event.target.value === "") {
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
    this.setState({ searchByNames: event.target.value });
  };

  handleCreateClient = event => {
    const { emailError } = this.state;
    event.preventDefault();
    const {
      Nombre,
      Apellido,
      RTN,
      Telefono,
      Telefono2,
      Company,
      email,
      editId,
      clientType,
      Autos,
    } = this.state;

    const newClient = {
      _id: editId,
      nombre: Nombre,
      apellido: Apellido,
      rtn: RTN,
      telefono: Telefono,
      telefonoTrabajo: Telefono2,
      compania: Company,
      autos: Autos,
      email,
      clientType,
    };
    let methodName;
    let error;
    if (editId) {
      methodName = "handleEditClient";
    } else {
      methodName = "handleCreateClient";
    }
    if (emailError) {
      this.setState({
        showSnackbar: true,
        snackbarText: "Por favor llene el campo de Correo Electrónico",
      });
    } else {
      if (validator.isEmpty(Nombre)) {
        error = "El campo Nombre es requerido";
      }
      if (validator.isEmpty(Apellido)) {
        error = "El campo Apellido es requerido";
      }
      if (validator.isEmpty(RTN)) {
        error = "El campo RTN es requerido";
      }
      if (validator.isEmpty(Telefono)) {
        error = "El campo Teléfono es requerido";
      }
      if (validator.isEmpty(Telefono2)) {
        error = "El campo Teléfono de Trabajo es requerido";
      }
      const maq = Cliente.find({ nombre: Nombre });
      maq.forEach(element => {
        if (element.rtn === RTN && methodName === "handleCreateClient") {
          error = "Este elemento ya ha sido agregado con anterioridad";
        }
      });
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: error,
        });
        return;
      }

      Meteor.call(methodName, newClient, err => {
        if (err) {
          this.setState({
            showSnackbar: true,
            snackbarText: "Ha ocurrido un error al intentar guardar el cliente",
          });
        } else {
          this.setState({
            showClientDialog: false,
            Nombre: "",
            Apellido: "",
            RTN: "",
            Telefono: "",
            Telefono2: "",
            Company: "",
            email: "",
            autos: [],
          });
        }
      });
    }
  };

  handleDeleteClient = () => {
    const { editId } = this.state;
    Meteor.call("handleDeleteClient", editId, error => {
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: "Ha ocurrido un error al eliminar el cliente",
        });
      } else {
        this.setState({
          showDeleteDialog: false,
          showSnackbar: true,
          snackbarText: "Cliente eliminado exitosamente",
        });
      }
    });
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
      editId,
      emailError,
      clientType,
      autos,
    } = this.state;
    const options = [
      { value: "Empresarial", label: "Empresarial" },
      { value: "Personal", label: "Personal" },
    ];
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
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar"}
            cliente
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre"
                  onInput={event => {
                    this.handleTextInput(event, "Nombre", text => {
                      return validator.isAlpha(text, "es-ES");
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
                      return validator.isAlpha(text, "es-ES");
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
                      return validator.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  label="RTN"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Teléfono"
                  onInput={event => {
                    this.handleTextInput(event, "Telefono", text => {
                      return validator.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  value={Telefono}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Teléfono del trabajo"
                  onInput={event => {
                    this.handleTextInput(event, "Telefono2", text => {
                      return validator.isNumeric(text, { no_symbols: true });
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
              <Grid item select xs={12} md={6}>
                <Select
                  label={clientType}
                  defaultValue={clientType}
                  style={{ width: "100%", position: "absolute" }}
                  options={[
                    { value: "Juridico", label: "Juridico" },
                    { value: "Personal", label: "Personal" },
                  ]}
                  onChange={this.handleClientTypeChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Autos"
                  onInput={event => {
                    this.handleTextInput(event, "autos");
                  }}
                  value={autos}
                  required
                  fullWidth
                />
              </Grid>
              {clientType === "Juridico" ? (
                <Grid item xs={12} md={6}>
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
                  autos: [],
                });
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
          ¿Está seguro que desea eliminar este cliente?
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
          <Button color="primary" variant="contained" onClick={this.handleDeleteClient}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderClientTable = () => {
    const { clients } = this.props;
    const { searchByNames } = this.state;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>RTN</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Teléfono secundario</TableCell>
            <TableCell>Compañía</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Tipo de cliente</TableCell>
            <TableCell>Autos comprados</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => {
            const searchRegex = new RegExp(
              searchByNames
                .split(/ /)
                .filter(c => c !== "")
                .join("|"),
              "i"
            );
            const r1 = client && client.nombre.search(searchRegex);
            const r2 = client && client.apellido.search(searchRegex);
            if (r1 === -1 && r2 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (client) {
              console.log(client);
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={client._id}>
                  <TableCell>{client.nombre}</TableCell>
                  <TableCell>{client.apellido}</TableCell>
                  <TableCell>{client.rtn}</TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>{client.telefonoTrabajo}</TableCell>
                  <TableCell>{client.compania}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.clientType}</TableCell>
                  <TableCell>{client.autosComprados.length}</TableCell>
                  <TableCell />
                  <TableCell>
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              editId: client._id,
                              showClientDialog: true,
                              Nombre: client.nombre,
                              Apellido: client.apellido,
                              RTN: client.rtn,
                              Telefono: client.telefono,
                              Telefono2: client.telefonoTrabajo,
                              Company: client.compania,
                              email: client.email,
                              clientType: client.clientType,
                              autos: client.autos,
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
                              editId: client._id,
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
            return <TableRow />;
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
      <DashboardLayout style={{ height: "150vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ width: "50%" }}
              label="Filtro por Nombre y Apellido"
              onInput={this.handleSearchName}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ showClientDialog: true, editId: undefined });
              }}>
              Agregar Cliente
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderClientTable()}
          </Grid>
        </Grid>
        {this.renderClientDialog()}
        {this.renderSnackbar()}
        {this.renderDeleteDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("clientes.all");
  const clients = Cliente.find().fetch();
  return {
    clients: clients && clients.reverse(),
  };
})(Clientes);
