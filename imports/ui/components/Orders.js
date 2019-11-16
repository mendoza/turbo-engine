/* eslint-disable no-script-url */
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(product, Type, Date, Status, Cost) {
  return { product, Type, Date, Status, Cost };
}

const rows = [
  createData("Vehiculo", 'Toyota Corolla', '16 Mar 2019', 'No vendido', 0),
  createData("Pieza", 'Radiador', '16 Mar 2019', 'comprado', 0),
  createData("Trabajo", 'Toyota Corolla', '16 Mar 2019', 'Terminado', 0),
  createData("Vehiculo", 'CRV', '16 Mar 2019', 'No vendido', 0),
  createData("Vehiculo", 'Honda Civic', '16 Mar 2019', 'Vendido', 0),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <>
      <Title>Recent Reports</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>TIpo de producto</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Costo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.product}>
              <TableCell>{row.Type}</TableCell>
              <TableCell>{row.Date}</TableCell>
              <TableCell>{row.Status}</TableCell>
              <TableCell align="right">{row.Cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */} 
        <Link color="primary" href="javascript:;">
          See more reports
        </Link>
      </div>
    </>
  );
}
