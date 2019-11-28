import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";

class ListUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      pathname: "",
      redirectData: {},
    };
  }

  render() {
    const { users } = this.props;
    const { shouldRedirect, pathname, redirectData } = this.state;

    return (
      <DashboardLayout>
        <Container>
          <Title>Estado de Vehículos</Title>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Vehículo</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Número de Placa</TableCell>
                <TableCell>Estado de Reparación</TableCell>
                <TableCell>Estado de Venta</TableCell>
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
                        Pollo
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