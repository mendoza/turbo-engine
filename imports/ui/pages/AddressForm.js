import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MaskedTextField from "../components/MaskedTextField";

export default function AddressForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos Generales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombres"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellidos"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <MaskedTextField
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            onChange={e => {
              console.log(e);
            }}
            required
            id="rtn"
            name="rtn"
            label="RTN"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <MaskedTextField
            mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
            onChange={e => {
              console.log(e);
            }}
            id="num"
            name="num"
            label="Numero de Telefono"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaskedTextField
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            onChange={e => {
              console.log(e);
            }}
            required
            id="id"
            name="id"
            label="Identidad"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MaskedTextField
            mask={[/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/]}
            onChange={e => {
              console.log(e);
            }}
            required
            id="fecha"
            name="fecha"
            label="Fecha"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            //label="Use esta dirección para detalles de pago"
            />
        </Grid> */}
      </Grid>
    </>
  );
}
