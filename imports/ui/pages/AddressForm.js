import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
      Dirección de Envío
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Primer Nombre"
            fullWidth
            autoComplete="fname"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="lname"
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Direccion 1"
            fullWidth
            autoComplete="billing address-line1"
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Direccion 2"
            fullWidth
            autoComplete="billing address-line2"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            autoComplete="billing address-level2"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Codigo Postal"
            fullWidth
            autoComplete="billing postal-code"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Pais"
            fullWidth
            autoComplete="billing country"
            />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use esta dirección para detalles de pago"
            />
        </Grid>
      </Grid>
    </>
  );
}