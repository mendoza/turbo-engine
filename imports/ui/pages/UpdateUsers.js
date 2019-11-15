import React, { PureComponent } from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
class UpdateUsers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = () => {
    Meteor.call("updateUsers", {}, (error, result) => {});
  };

  render() {
    return (
      <Container>
        <Typography variant="h1">esto es el update</Typography>
        <Button onClick={this.handleClick}>Tokme, wakala k riko</Button>
      </Container>
    );
  }
}

export default UpdateUsers;
