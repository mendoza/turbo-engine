import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";

export default class Users extends Component {
  render() {
    return (
      <div >
        <Paper className="prueba">
          wenas este es el home :v
          <Link to="/about"> go to about</Link>
        </Paper>
      </div>
    );
  }
}
