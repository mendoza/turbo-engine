import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Fecha', price: 'fecha' },
  { name: 'Comprador', price: 'Nombre del comprador'  },
  { name: 'Número de identidad', price: 'Identidad' },
  { name: 'RTN', price: 'rtn' },
];
const addresses = ['Dirección 1', 'Dirección 2', 'País'];

const payments = [
  { name: 'Tipo de pago', detail: 'Efectivo o tarjeta' },
  { name: 'Total', detail: 'Total' },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  return (
    <>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
      </List>


      <Grid container spacing={2}>


        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Dirección
          </Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>


        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalles de Pago
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        

      </Grid>
    </>
  );
}