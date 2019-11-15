import React, { PureComponent } from "react";
import { Container, Typography } from "@material-ui/core";
import ChartistGraph from "react-chartist";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DashboardLayout from "../layouts/DashboardLayout";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // Para el gráfico
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

    // Datos de ejemplo
    function createData(typef, product, date, status) {
      return { typef, product, date, status };
    }
    const rows = [
      createData("Compra de repuesto", "Carburador", "10/12/2019", true),
      createData("Reparación de automovil", "Toyota corolla", "10/12/2019", false),
      createData("Venta de automovil", "Honda CRV", "10/12/2019", true),
      createData("Compra de repuesto", "Amortiguador", "10/12/2019", true),
    ];

    return (
      <DashboardLayout Routes={[]}>
        <Container padding="30px">
          <div>
            <Typography variant="h4" component="h2" margin="30px">
              Gráfico
            </Typography>
            <Paper>
              <ChartistGraph data={data} options={options} type={type} />
            </Paper>
          </div>
          <div>
            <Typography variant="h4" component="h2">
              Reportes
            </Typography>
            <Paper>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo de reporte</TableCell>
                    <TableCell align="right">Producto</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                    <TableCell align="right">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.type}>
                      <TableCell component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="right">{row.product}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </Container>
      </DashboardLayout>
    );
  }
}

export default Dashboard;
