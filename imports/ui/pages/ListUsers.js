import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {
  Button,
  Container,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogContentText,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";

class ListUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
      shouldRedirect: false,
      shouldRedirectAdd: false,
      pathname: "",
      redirectData: {},
      dialogUser: { emails: [{}], profile: {} },
      showDeleteDialog: false,
      deleteUserId: undefined,
      showSnackbar: false,
      snackbarText: '',
    };
  }

  handleClose = () => {
    this.setState({ shouldRender: false });
  };

  handleCloseDelete = () => {
    this.setState({
      showDeleteDialog: false,
      deleteUserId: undefined,
    });
  }

  showDeleteDialog = (event, userId) => {
    this.setState({
      showDeleteDialog: true,
      deleteUserId: userId,
    });
  }

  handleCloseSnackbar = () => {
    this.setState({
      showSnackbar: false,
    });
  }

  deleteUser = () => {
    const { deleteUserId } = this.state;
    Meteor.call('deleteUsers', deleteUserId, err => {
      if (err) {
        let snackbarText;
        if (err.error === 'superAdmin') {
          snackbarText = 'No puede eliminar al usuario super administrador';
        } else {
          snackbarText = 'Ha habido un error al intentar eliminar este usuario';
        }
        this.setState({
          showDeleteDialog: false,
          showSnackbar: true,
          snackbarText
        });
      } else {
        this.setState({
          showDeleteDialog: false,
          showSnackbar: true,
          snackbarText: 'El usuario ha sido eliminado exitosamente',
        });
      }
    });
  }

  render() {
    const { users } = this.props;
    const { shouldRender, shouldRedirect, pathname,
      redirectData, dialogUser, showDeleteDialog,
      showSnackbar, snackbarText } = this.state;
    return (
      <DashboardLayout>
        <Container>
          <Grid container xs={12}>
            <Grid xs="6">
              <Title>Listar usuarios</Title>
            </Grid>
            <Grid xs="6">
              <Button
                width="10%"
                type="submit"
                color="primary"
                variant="contained"
                onClick={() => {
                  this.setState({ shouldRedirectAdd: true, pathname: "/crearUsuarios" });
                }}>
                <i className="fas fa-user-plus" />
                Agregar Usuarios
              </Button>
            </Grid>
          </Grid>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>Nombre(s)</TableCell>
                <TableCell>Apellidos(s)</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => {
                if (user) {
                  return (
                    // eslint-disable-next-line no-underscore-dangle
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {user.emails && user.emails[0].address}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.profile.firstName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.profile.lastName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.profile.role}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div>
                          <ToggleButtonGroup aria-label="text alignment">
                            <ToggleButton
                              value="left"
                              onClick={() => {
                                this.setState({ shouldRender: true, dialogUser: user });
                              }}
                              aria-label="left aligned">
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
                              <CreateIcon />
                            </ToggleButton>
                            <ToggleButton
                              value="right"
                              aria-label="right aligned"
                              onClick={(event) => { this.showDeleteDialog(event, user._id) }}
                              >
                              <DeleteForeverIcon />
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
                return <></>;
              })}
              <Dialog open={shouldRender} onClose={this.handleClose}>
                <DialogTitle>Información del usuario</DialogTitle>
                <Divider />
                <DialogContent dividers>
                  <i className="fas fa-user-circle" style={{ fontSize: "90px", align: "center" }} />
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Title>Nombre: </Title>
                      <p>{dialogUser.profile.firstName}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <Title>Apellido:</Title>
                      <p>{dialogUser.profile.lastName}</p>
                    </Grid>
                  </Grid>
                  <Title>Rol: </Title>
                  <p>{dialogUser.profile.role}</p>
                  <Title>Fecha de nacimiento: </Title>
                  <p> nel </p>
                  <Title>Correos: </Title>
                  <p>{dialogUser.emails[0].address}</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
            </TableBody>
            {shouldRedirectAdd ? <Redirect to={pathname} /> : null}
            {shouldRedirect ? <Redirect to={{ pathname, state: { ...redirectData } }} /> : null}
          </Table>
        </Container>
        <Dialog
          open={showDeleteDialog}
          onClose={this.handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            ¿Esta seguro que desea eliminar este usuario?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Eliminar el usuario es una acción no reversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary" autoFocus>
              Cancelar
            </Button>
            <Button onClick={this.deleteUser} color="primary">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{snackbarText}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
              >
              <i className="fas fa-times" />
            </IconButton>,
          ]}
          />
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("users.all");
  return {
    users: Meteor.users.find().fetch(),
  };
})(ListUsers);
