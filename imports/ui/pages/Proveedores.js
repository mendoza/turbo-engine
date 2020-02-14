
import React, { Component } from "react";
import {Meteor} from 'meteor/meteor';
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
  MenuItem
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import Select from "react-select";
import DashboardLayout from "../layouts/DashboardLayout";
import Cliente from "../../api/collections/Cliente/Cliente";
import MaskedTextField from "../components/MaskedTextField";
import Autos from '../../api/collections/Autos/Autos';



const CeldaAuto = ({autos}) => (
  <TableCell component="th" scope="row">
    {autos.map(auto =>{
      {}
    })}
  </TableCell>
)
withTracker((clientesAutos)=> {
  Meteor.subscribe('Autos.cliente', clientesAutos);
  return {
    autos: Autos.find().fetch()
  }
})(CeldaAuto)


class Proveedores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClientDialog: false,
      showSnackbar: false,
      showDeleteDialog: false,
      editId: undefined,

      snackbarText: '',
      Nombre: '',
      Apellido: '',
      Codigo: '',
      Telefono: '',
      Telefono2: '',
      Company: '',
      email: '',
      autos: [],
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
  clienteEmpresario = (event) => {
    let error;
    //if (stateName === "email") {
      
    //}
  };

  handleCreateProvider = event => {
    const { emailError } = this.state;
    event.preventDefault();
    const {
      Nombre, Apellido, Codigo, Telefono, Telefono2, Company, email, editId, Autos,clientType,
    } = this.state;

    const newClient = {
      _id: editId,
      nombre: Nombre,
      apellido: Apellido,
      codigo: Codigo,
      telefono: Telefono,
      telefonoTrabajo: Telefono2,
      compania: Company,
      email,
      clientType,
      autos: Autos
    };
    let methodName;
    if (editId) {
      methodName = "handleEditClient";
    } else {
      methodName = "handleCreateProvider";
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
            snackbarText: "Ha ocurrido un error al intentar guardar el proveedor",
          });
        } else {
          this.setState({
            showClientDialog: false,
            Nombre: "",
            Apellido: "",
            Codigo: "",
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

  renderClientDialog = () => {
    const {
      showClientDialog,
      Nombre,
      Apellido,
      Codigo,
      Telefono,
      Telefono2,
      Company,
      email,
      editId,
      emailError,
      clientType,
      clientTypeLabel,
      flagCliente,
      autos,
    } = this.state;
    const options1 = [
      { value: "Empresarial", label: "Empresarial" },
      { value: "Personal", label: "Personal" },
    ];
    return (
      <Dialog
        open={showClientDialog}
        onClose={() => {
          this.setState({ showClientDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreateProvider}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            Proveedor
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
                  value={Codigo}
                  name="Codigo"
                  onChange={event => {Codigo
                    this.handleTextInput(event, "Codigo", text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    });
                  }}
                  label="Codigo"
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
                <InputLabel>IVA</InputLabel>
                <Select
                  style={{ width: "100%", position: "absolute" }}
                  options={[
                    { value: "Responsable Inscripto", label: "Responsable Inscripto" },
                    { value: "Otro/Prengutale a tu hermano", label: "Otro/Prengutale a tu hermano" },
                  ]}
                  onChange={ev =>
                    this.setState({
                      clientType: ev.value,
                      clientTypeLabel: ev.label,
                      flagCliente: ev.value,
                    }),
                    this.clienteEmpresario(flagCliente)
                  }
                  value={clientType}

                >
                  <MenuItem value={"Empresarial"}>Natural</MenuItem>
                  <MenuItem value={"Personal"}>Ejecutivo</MenuItem>
                </Select>
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
              <Grid item xs={12} md={6}>
                <TextField
                  label="Autos"
                  onInput={event => { this.handleTextInput(event, 'autos') }}
                  value={autos}
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
          <Button color="primary" variant="contained" onClick={this.handleDeleteClient}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  renderProviderTable = () => {
    const { clients, autos } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Teléfono de Trabajo</TableCell>
            <TableCell>Compañía</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Autos</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(provider => {
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
                    {provider.codigo}
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
                    {provider.clientType}
                    {CeldaAuto}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              editId: provider._id,
                              showClientDialog: true,
                              Nombre: provider.nombre,
                              Apellido: provider.apellido,
                              Codigo: provider.codigo,
                              Telefono: provider.telefono,
                              Telefono2: provider.telefonoTrabajo,
                              Company: provider.compania,
                              email: provider.email,
                              clientType:provider.clientType,
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ showClientDialog: true, editId: undefined });
              }}>
              Agregar Proveedores
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderProviderTable()}
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
  Meteor.subscribe("proveedores.all");
  const clients = Cliente.find().fetch();
  return {
    clients: clients && clients.reverse(),
  };
})(Proveedores);
