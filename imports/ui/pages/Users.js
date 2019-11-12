import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper, Container, Card } from "@material-ui/core";
import ChartistGraph from "react-chartist";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from '../layouts/Deposits';
import Orders from '../layouts/Orders';


export default class Users extends Component {
  render() {
    var data = {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
    };


    var options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        },
      },
    };

    var type = "Bar";
    return (
      <Container>
        <Paper style={{ height: "100vh" }}>
          <ChartistGraph data={data} options={options} type={type} />
           wenas este es el home :v
          <Link to="/about"> go to about</Link>
        </Paper>
      </Container>
    );
  }
}
