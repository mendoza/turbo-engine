import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Paper, Container, Card } from "@material-ui/core";
import ChartistGraph from "react-chartist";


import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
