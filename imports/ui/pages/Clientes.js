import React, { Component } from 'react'
import validatorjs from "validator";
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, Snackbar, IconButton, Table, TableRow, TableHead, TableCell, TableBody
} from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import DashboardLayout from "../layouts/DashboardLayout";
import Cliente from '../../api/collections/Cliente/Cliente';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';

class Clientes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddClientDialog: false,
      showSnackbar: false,
      snackbarText: '',
      Nombre: '',
      Apellido: '',
      RTN: '',
      Telefono: '',
      Telefono2: '',
      Company: '',
      email: '',
    }
  }

  handleTextInput = (event, stateName, validator) => {
    if (validator) {
      if (validator(event.target.value) || event.target.value === '') {
        this.setState({
          [stateName]: event.target.value,
        });
      }
    } else {
      this.setState({
        [stateName]: event.target.value,
      });
    }
  }

  handleCreateClient = event => {
    event.preventDefault();
    const {
      Nombre, Apellido, RTN, Telefono, Telefono2, Company, email,
    } = this.state;
    const newClient = {
      nombre: Nombre,
      apellido: Apellido,
      rtn: RTN,
      telefono: Telefono,
      telefonoTrabajo: Telefono2,
      compania: Company,
      email,
    };
    Meteor.call('handleCreateClient', newClient, error => {
      if (error) {
        this.setState({
          showSnackbar: true,
          snackbarText: 'Ha ocurrido un error al intentar guardar el cliente'
        });
      } else {
        this.setState({
          showAddClientDialog: false,
          Nombre: '',
          Apellido: '',
          RTN: '',
          Telefono: '',
          Telefono2: '',
          Company: '',
          email: '',
        });
      }
    });
  }

  renderAddClientDialog = () => {
    const {
      showAddClientDialog,
      Nombre,
      Apellido,
      RTN,
      Telefono,
      Telefono2,
      Company,
      email,
    } = this.state;
    return (
      <Dialog
        open={showAddClientDialog}
        onClose={() => { this.setState({ showAddClientDialog: false }) }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        >
        <form onSubmit={this.handleCreateClient}>
          <DialogTitle id="form-dialog-title">Agregar cliente</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre"
                  onInput={event => {
                    this.handleTextInput(event, 'Nombre', text => {
                      return validatorjs.isAlpha(text, 'es-ES')
                    })
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
                    this.handleTextInput(event, 'Apellido', text => {
                      return validatorjs.isAlpha(text, 'es-ES')
                    })
                  }}
                  value={Apellido}
                  required
                  fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="RTN"
                  onInput={event => {
                    this.handleTextInput(event, 'RTN', text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    })
                  }}
                  value={RTN}
                  fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Teléfono"
                  onInput={event => {
                    this.handleTextInput(event, 'Telefono', text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    })
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
                    this.handleTextInput(event, 'Telefono2', text => {
                      return validatorjs.isNumeric(text, { no_symbols: true });
                    })
                  }}
                  value={Telefono2}
                  fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Compañía"
                  onInput={event => { this.handleTextInput(event, 'Company') }}
                  value={Company}
                  fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="E-Mail"
                  onInput={event => { this.handleTextInput(event, 'email', validatorjs.isEmail) }}
                  value={email}
                  fullWidth
                  />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { this.setState({ showAddClientDialog: false }) }}
              color="primary"
              variant="contained"
              >
              Cancelar
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

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
                          value="left"
                          onClick={() => {
                            this.setState({ shouldRender: true, dialogUser: user });
                          }}
                          aria-label="left aligned"
                          >
                          <i className="fas fa-address-card" />
                        </ToggleButton>
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              shouldRedirect: true,
                              pathname: "/actualizarUsuarios",
                              redirectData: { user },
                            });
                          }}
                          aria-label="centered"
                          >
                          <i className="fas fa-plus" />
                        </ToggleButton>
                        <ToggleButton
                          value="right"
                          aria-label="right aligned"
                          onClick={(event) => { this.showDeleteDialog(event, user._id) }}
                          >
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
  }

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
        onClose={
          () => { this.setState({ showSnackbar: false }) }
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{snackbarText}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => { this.setState({ showSnackbar: false }) }}
            >
            <i className="fas fa-times" />
          </IconButton>,
        ]}
        />
    );
  }

  render() {
    return (
      <DashboardLayout style={{ height: '100vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { this.setState({ showAddClientDialog: true }) }}
              >
              Agregar Cliente
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderClientTable()}
          </Grid>
        </Grid>
        {this.renderAddClientDialog()}
        {this.renderSnackbar()}
      </DashboardLayout>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('clientes.all');
  return {
    clients: Cliente.find().fetch()
  }
})(Clientes);
