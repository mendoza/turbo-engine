import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";
import Historial from "../../api/collections/Historial/Historial";
import Cliente from "../../api/collections/Cliente/Cliente";
import Autos from "../../api/collections/Autos/Autos";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      datos: [
        { name: "Mes 1", Malo: 400, Bueno: 2400, Excelente: 2400 },
        { name: "Mes 2", Malo: 100, Bueno: 2400, Excelente: 2400 },
        { name: "Mes 3", Malo: 400, Bueno: 2400, Excelente: 2400 },
        { name: "Mes 4", Malo: 300, Bueno: 2400, Excelente: 2400 },
        { name: "Mes 5", Malo: 150, Bueno: 2400, Excelente: 2400 },
      ]
    };
  }

  renderGrafico = () =>{
    return(
      <BarChart 
        margin={{top: 20, right: 20, bottom: 20, left: 20,}}
        width={700} 
        height={300} 
        data={this.state.datos}
        >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Malo" fill="#ec7063 " />
        <Bar dataKey="Bueno" fill="#5499c7" />
        <Bar dataKey="Excelente" fill="#52be80" />
      </BarChart>
    );
  }

  renderHistorialTable = () => {
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
          {historial.map(row => {
            const fecha = new Date(row.fecha);
            const cliente = Cliente.findOne({ _id: row.cliente });
            const auto = Autos.findOne({ _id: row.producto });
            if (cliente !== undefined && auto !== undefined && fecha !== undefined)
              return (
                <TableRow key={row.cliente}>
                  <TableCell>{`${cliente.nombre} ${cliente.apellido}`}</TableCell>
                  <TableCell>{`${auto.marca} ${auto.modelo} con placa ${auto.placa}`}</TableCell>
                  <TableCell>{fecha.toLocaleDateString("en-US")}</TableCell>
                  <TableCell>{row.comentario}</TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    );
  };

  render() {

    return (
      <DashboardLayout Routes={[]}>
        <Grid container className="gridRoot">
          {this.renderGrafico()}
        </Grid>

        <Grid container className="gridRoot">
          <Title>Autos vendidos</Title>
        </Grid>

        <Grid container className="gridRoot" xs={12}>
          {this.renderHistorialTable()}
        </Grid>

      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("historial.all");
  Meteor.subscribe("Autos.all");
  Meteor.subscribe("clientes.all");
  const historial = Historial.find().fetch();
  return {
    historial: historial && historial.reverse(),
  };
})(Dashboard);
