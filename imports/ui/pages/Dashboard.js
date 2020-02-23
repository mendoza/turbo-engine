import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  Bar,
  BarChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import Historial from "../../api/collections/Historial/Historial";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      widthChart: 0,
    };
  }

  renderHistorialTable = () =>{
    const { historial } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Comentario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map(row => (
            <TableRow key={row.cliente}>
              <TableCell>{row.producto}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.comentario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  componentDidMount = () => {
    this.setState({ widthChart: window.innerWidth });
  };

  render() {
    const { widthChart } = this.state;

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
          <Title>Autos vendidos</Title>
          {this.renderHistorialTable()}
        </Grid>

      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("historial.all");
  const historial = Historial.find().fetch();
  return {
    historial: historial && historial.reverse(),
  };
})(Dashboard);
