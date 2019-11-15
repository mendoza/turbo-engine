import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { Typography, Container } from "@material-ui/core";

class ListUsers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { usuarios: {} };
  }

  componentDidMount = () => {
    Meteor.call("listUsuario", {}, (err, result) => {
      this.setState({ usuarios: result });
    });
  };

  render() {
    const { usuarios } = this.state;
    return (
      <Container>
        <Typography variant="h1">Listar usuarios</Typography>
        {Object.values(usuarios).map((user, index) => {
          return (
            <Typography variant="body1">{`ID: ${user._id} username: ${user.username}`}</Typography>
          );
        })}
      </Container>
    );
  }
}

export default ListUsers;
