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
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";

class ListUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { shouldRender: false, shouldRedirect: false, pathname: "", redirectData: {} };
  }

  render() {
    const { users } = this.props;
    const { shouldRender, shouldRedirect, pathname, redirectData } = this.state;

    const handleClose = () => {
      this.setState({ shouldRender: false });
    };

    return (
      <DashboardLayout>
        <Container>
          <Title>Listar usuarios</Title>
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
                                this.setState({ shouldRender: true });
                              }}
                              aria-label="left aligned">
                              <PersonIcon />
                              <Dialog open={shouldRender} onClose={handleClose}>
                                <DialogTitle>Información del usuario</DialogTitle>
                                <Divider />

                                <DialogContent dividers>
                                  <Title>Nombre: </Title>
                                  <p>{user.profile.firstName}</p>
                                  <Title>Segundo nombre:</Title>
                                  <p>{user.profile.lastName}</p>
                                  <Title>Rol: </Title>
                                  <p>{user.profile.role}</p>
                                  <Title>Fecha de nacimiento: </Title>
                                  <p> nel </p>
                                  <Title>Correos: </Title>

                                  <Title>trabajos: </Title>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>ID del auto</TableCell>
                                      </TableRow>
                                    </TableHead>
                                  </Table>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} color="primary">
                                    Cerrar
                                  </Button>
                                </DialogActions>
                              </Dialog>
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
                              aria-label="centered">
                              <CreateIcon />
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
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
            </TableBody>
            {shouldRedirect ? <Redirect to={{ pathname, state: { ...redirectData } }} /> : null}
          </Table>
        </Container>
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
