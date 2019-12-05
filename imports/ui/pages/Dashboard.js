import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import {
  Legend,
  Tooltip,
  Bar,
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import Orders from "../components/Orders";
import Title from "../components/Title";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // Linechart
    const data = [
      { name: "Pagina A", uv: 400, pv: 2400, amt: 2400 },
      { name: "Pagina B", uv: 100, pv: 2400, amt: 2400 },
      { name: "Pagina C", uv: 400, pv: 2400, amt: 2400 },
      { name: "Pagina D", uv: 300, pv: 2400, amt: 2400 },
      { name: "Pagina E", uv: 150, pv: 2400, amt: 2400 },
    ];
    // Barchart
    const databar = [
      { name: "Enero", uv: 400, pv: 2400, amt: 2400 },
      { name: "Febrero", uv: 400, pv: 2400, amt: 2400 },
      { name: "Marzo", uv: 400, pv: 2400, amt: 2400 },
      { name: "Abril", uv: 400, pv: 2400, amt: 2400 },
      { name: "Mayo", uv: 400, pv: 2400, amt: 2400 },
      { name: "Junio", uv: 400, pv: 2400, amt: 2400 },
      { name: "Julio", uv: 400, pv: 2400, amt: 2400 },
      { name: "Agost", uv: 400, pv: 2400, amt: 2400 },
      { name: "Septiembre", uv: 400, pv: 2400, amt: 2400 },
      { name: "Octubre", uv: 400, pv: 2400, amt: 2400 },
      { name: "Noviembre", uv: 400, pv: 2400, amt: 2400 },
      { name: "Diciembre", uv: 400, pv: 2400, amt: 2400 },
    ];

    return (
      <DashboardLayout Routes={[]}>
        <Grid container className="gridRoot" item xs={12} spacing={1}>
          <Grid item xs={12} sm={6}>
            <ResponsiveContainer width="100%">
              <div>
                <LineChart width={500} height={230} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </div>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ResponsiveContainer width="100%">
              <div>
                <BarChart width={500} height={230} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </div>
            </ResponsiveContainer>
          </Grid>
        </Grid>

        <Grid container className="gridRoot" item xs={12} spacing={2}>
          <Orders />
        </Grid>
      </DashboardLayout>
    );
  }
}

export default Dashboard;
