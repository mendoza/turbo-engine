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
      pathname: "",
      redirectData: {},
      dialogUser: { emails: [{}], profile: {} },
    };
  }

  handleClose = () => {
    this.setState({ shouldRender: false });
  };

  render() {
    const { users } = this.props;
    const { shouldRender, shouldRedirect, pathname, redirectData, dialogUser } = this.state;

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
                              aria-label="centered">
                              <i className="fas fa-user-plus" />
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                              <i className="fas fa-trash-alt" />
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
                      <Title>Segundo nombre:</Title>
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
