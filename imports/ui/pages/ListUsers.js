import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {
  Typography, Container, Table, TableHead, TableRow, TableCell, TableBody
} from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";

class ListUsers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { users } = this.props;
    return (
      <DashboardLayout>
        <Container>
          <Typography variant="h1">Listar usuarios</Typography>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>Nombre(s)</TableCell>
                <TableCell>Apellidos(s)</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                if (user) {
                  return (
                    // eslint-disable-next-line no-underscore-dangle
                    <TableRow key={user._id}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        {user.emails && user.emails[0].address}
                      </TableCell>
                      <TableCell component="th" scope="row">{user.profile.firstName}</TableCell>
                      <TableCell component="th" scope="row">{user.profile.lastName}</TableCell>
                      <TableCell component="th" scope="row">{user.profile.role}</TableCell>
                    </TableRow>
                  );
                }
                return <></>;
              })}
            </TableBody>
          </Table>
        </Container>
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('users.all');
  return {
    users: Meteor.users.find().fetch(),
  }
})(ListUsers);
