import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper, Container } from "@material-ui/core";

export default class Users extends Component {
  render() {
    return (
      <Container>
        <Paper style={{ height: "100vh" }}>
          wenas este es el home :v
          <Link to="/about"> go to about</Link>
        </Paper>
      </Container>
    );
  }
}
