import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';

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
                          <ToggleButtonGroup>
                            <ToggleButton value="left" aria-label="left aligned">
                              <PersonIcon />
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
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
