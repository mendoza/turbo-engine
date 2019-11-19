import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import {
  Backdrop,
  Container,
  Fade,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";



import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title"

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
          <Title>Listar usuarios</Title>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Correo</TableCell>
                <TableCell>Nombre(s)</TableCell>
                <TableCell>Apellidos(s)</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>  </TableCell>
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
                            <ToggleButton value="left" aria-label="left aligned">
                              <PersonIcon />
                            </ToggleButton>
                            <Modal />
                            <ToggleButton value="center" aria-label="centered" href="/actualizarUsuarios">
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
