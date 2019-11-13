import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import ChartistGraph from "react-chartist";

class Users extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const data = {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
      series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
    };

    const options = {
      high: 10,
      low: -10,
      axisX: {
        unction(value, index) {
          return index % 2 === 0 ? value : null;
        },
      },
    };

    const type = "Bar";
    return (
      <Container>
        <ChartistGraph data={data} options={options} type={type} />
        wenas este es el home :v
        <Link to="/about"> go to about</Link>
      </Container>
    );
  }
}

export default Users;
