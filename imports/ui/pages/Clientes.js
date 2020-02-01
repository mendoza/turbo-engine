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
import Cliente from "../../api/collections/Cliente/Cliente";
import MaskedTextField from "../components/MaskedTextField";

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClientDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      editId: undefined,
      snackbarText: "",
      Nombre: "",
      Apellido: "",
      RTN: "",
      Telefono: "",
      Telefono2: "",
      Company: "",
      email: "",
    };
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

  handleCreateClient = event => {
    const { emailError } = this.state;
    event.preventDefault();
    const { Nombre, Apellido, RTN, Telefono, Telefono2, Company, email, editId } = this.state;
    const newClient = {
      _id: editId,
      nombre: Nombre,
      apellido: Apellido,
      rtn: RTN,
      telefono: Telefono,
      telefonoTrabajo: Telefono2,
      compania: Company,
      email,
    };
    let methodName;
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
      Meteor.call(methodName, newClient, error => {
        if (error) {
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
    } = this.state;
    return (
      <Dialog
        open={showClientDialog}
        onClose={() => {
          this.setState({ showClientDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateClient}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            cliente
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
                  label="Teléfono del trabajo"
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
                  label="Compañía"
                  onInput={event => {
                    this.handleTextInput(event, "Company");
                  }}
                  value={Company}
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ showClientDialog: false });
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
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>RTN</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Teléfono de Trabajo</TableCell>
            <TableCell>Compañía</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => {
            if (client) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={client.nombre}>
                  <TableCell component="th" scope="row">
                    {client.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client.apellido}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client.rtn}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client.telefono}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client.telefonoTrabajo}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client.compania}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {client.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
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
