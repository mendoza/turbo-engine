import React, { PureComponent } from "react";
import { Container, Button, IconButton, Grid, TextField, Snackbar} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Title from "../components/Title";

class CreatePiezas extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      vendedor: "",
      precio: "",
      numeroDeSerie: "",
      tipo: "",
      open: false,
      message: "",
    };
  }

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  handleClick = () => {
    const { vendedor, precio, numeroDeSerie, tipo } = this.state;
    let alert;
    
    
    if (validator.isEmpty(tipo)) {
      alert = "El campo tipo es requerido";
    }
    if (validator.isEmpty(precio)) {
      alert = "El campo precio es requerido";
    }
    if (validator.isEmpty(numeroDeSerie)) {
      alert = "El numero de serie es requerido";
    }
    if (validator.isEmpty(vendedor)) {
      alert = "El campo vendedor es requerido";
    }

    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
		}else{
      console.log({
        vendedor,
        precio,
				numeroDeSerie,
				tipo,
      })
			Meteor.call(
				"addPieza",
				{
					vendedor,
          precio,
					numeroDeSerie,
					tipo,
				}
      );
      this.setState({
        open: true,
        message: "Pieza agregada exitosamente",
      });
		}
  };

  render() {
    const { vendedor, precio, numeroDeSerie, tipo, open, message} = this.state;
    return (
      <DashboardLayout>
        <Container>
          <Title>Agregar Piezas</Title>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="seller"
                  name="Seller"
                  variant="outlined"
                  required
                  fullWidth
                  id="Seller"
                  label="Vendedor"
                  autoFocus
                  value={vendedor}
                  onInput={event => this.handleTextChange(event, "vendedor")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="serieNum"
                  name="SerieNumbre"
                  variant="outlined"
                  required
                  fullWidth
                  id="SerieNumber"
                  label="NumeroDeSerie"
                  value={numeroDeSerie}
                  onInput={event => this.handleTextChange(event, "numeroDeSerie")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="price"
                  name="Price"
                  variant="outlined"
                  required
                  fullWidth
                  id="Price"
                  label="precio"
                  value={precio}
                  onInput={event => this.handleTextChange(event, "precio")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="type"
                  name="Type"
                  variant="outlined"
                  required
                  fullWidth
                  id="Type"
                  label="tipo"
                  value={tipo}
                  onInput={event => this.handleTextChange(event, "tipo")}
                />
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleClick}>
                Crear
              </Button>
            </Grid>
          </form>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
      </DashboardLayout>
    );
  }
}

export default CreatePiezas;
