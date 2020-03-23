import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from '@material-ui/core/Link';
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
import Encuestas from "../../api/collections/Encuestas/Encuestas";
import Autos from "../../api/collections/Autos/Autos";
import Clientes from "../../api/collections/Cliente/Cliente"

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  calcularDatos = () =>{
    let contador = 0;
    let contM = 0;
    let contB = 0;
    let contE = 0;
    const {encuestas} = this.props;
    const datos = [
      { name: "Enero", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Febrero", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Marzo", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Abril", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Mayo", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Junio", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Julio", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Agosto", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Septiembre", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Octubre", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Noviembre", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Diciembre", Malo: 0, Bueno: 0, Excelente: 0 },
    ];
    encuestas.map(encuesta => {
      const date = new Date(encuesta.fecha);
      const month = date.getMonth();
      console.log(date.getMonth());
      if(encuesta.score === 0){
        contador += 1;
        contM += 1;
      } else if(encuesta.score === 1){
        contador += 1;
        contB += 1;
      } else {
        contador += 1;
        contE += 1;
      }
      datos[month].Malo = ((contM/contador)*100).toFixed(2);
      datos[month].Bueno = ((contB/contador)*100).toFixed(2);
      datos[month].Excelente = ((contE/contador)*100).toFixed(2);
    }); 
    return datos;
  }

  renderGrafico = () =>{
    
    return(
      <BarChart 
        margin={{top: 20, right: 20, bottom: 20, left: 20,}}
        width={1000} 
        height={300} 
        data={this.calcularDatos()}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map(row => {
            const fecha = new Date(row.fecha);
            let cliente;
            const auto = Autos.findOne({ _id: row.producto });
            if (row.cliente !== "0") {
              cliente = Clientes.findOne({ _id: row.cliente });
            } else {
              cliente = { nombre: "Cliente", apellido: "Final" };
            }
            if (row) {
              return (
                <TableRow key={row._id}>
                  <TableCell>{`${cliente.nombre} ${cliente.apellido}`}</TableCell>
                  <TableCell>{`${auto.marca} ${auto.modelo} con placa ${auto.placa}`}</TableCell>
                  <TableCell>{fecha.toLocaleDateString("en-US")}</TableCell>
                </TableRow>
              );
            }
            return <></>;
          })}
        </TableBody>
        <Link color="#3b7fed" href="/historial">
            Ver más
        </Link>
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
  Meteor.subscribe("Encuestas.all");
  Meteor.subscribe("clientes.all");
  Meteor.subscribe("Autos.all");
  return {
    encuestas: Encuestas.find({}).fetch(),
    historial: Historial.find({}).fetch(),
  };
})(Dashboard);
