import React, { PureComponent } from "react";
import { Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import Orders from "../components/Orders";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // Linechart
    const data = [
      { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
      { name: "Page B", uv: 100, pv: 2400, amt: 2400 },
      { name: "Page C", uv: 400, pv: 2400, amt: 2400 },
    ];
    
    return (
      <DashboardLayout Routes={[]}>
        <Container padding="30px">
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid>
              <Title>Ganancias anuales</Title>
              <LineChart width={500} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </Grid>
            <Grid item xs={6}>
              <Title>Other</Title>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Orders />
            </Paper>
          </Grid>
        </Container>
      </DashboardLayout>
    );
  }
}

export default Dashboard;
