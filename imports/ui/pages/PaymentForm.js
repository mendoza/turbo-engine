import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MaskedTextField from "../components/MaskedTextField";

export default function PaymentForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Metodo de Pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Nombre de Tarjeta" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedTextField
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            name="placa"
            onChange={e => {
              console.log(e);
            }}
            required
            id="cardNumber"
            label="Numero de Tarjeta"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedTextField
            mask={[/\d/, /\d/, "/", /\d/, /\d/]}
            name="placa"
            onChange={e => {
              console.log(e);
            }}
            required
            id="expDate"
            fullWidth
            label="Fecha de Caducidad"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaskedTextField
            mask={[/\d/, /\d/, /\d/]}
            name="placa"
            onChange={e => {
              console.log(e);
            }}
            required
            id="cvv"
            label="CVV"
            helperText="Últimos tres dígitos en la tira de firma"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            //label="Recuerde los detalles de la tarjeta de crédito para la próxima vez"
          />
        </Grid>
      </Grid>
    </>
  );
}
