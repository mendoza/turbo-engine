import React, { PureComponent } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  TextField,
  Snackbar,
  IconButton
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import ItemCard from "../components/ItemCard";
import Title from "../components/Title";
import Autos from "../../api/collections/Autos/Autos";
import Cliente from "../../api/collections/Cliente/Cliente";
import AutosFiles from "../../api/collections/AutosFiles/AutosFiles";
import { Estados } from "../Constants";

class Vender extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      dialogOpen: false,
      selectedCar: {},
      cliente: "",
      comment: "",
      montoTotal: "",
      tipoPago: "",
      message: "",
    };
  }
  
  handleCreate = () =>{
    const {cliente, comment, montoTotal, tipoPago, selectedCar} = this.state;
    let alert;
    if (validator.isEmpty(cliente) === true) {
      alert = "El campo cliente es requerido";
    }
    if (validator.isEmpty(montoTotal) === true) {
      alert = "El campo monto es requerido";
    }
    if (!validator.isNumeric(montoTotal)) {
      alert = "El monto solo debe contener números";
    } else if (montoTotal < 1) {
      alert = "El monto no puede ser cero o un número negativo";
    }
    if (validator.isEmpty(tipoPago) === true) {
      alert = "El campo tipo de pago es requerido";
    }
    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call(
        "addHistorial",
        {
          cliente,
          producto: selectedCar._id,
          fecha: new Date().getTime(),
          comentario: comment,
          monto: montoTotal,
          tipo: tipoPago
        },
        err => {
          
          Meteor.call("marcarComprado", selectedCar, error => {
            

            if (cliente !== "0") {  
              Meteor.call(
                "addSoldCar",
                { carId: selectedCar._id, clientId: cliente },
                () => {
                  this.setState({
                    open: true, 
                    message: "Se creo la compra exitosamente", 
                    dialogOpen: false, 
                    selectedCar: {} });
                }
              );
            } else {
              this.setState({
                open: true, 
                message: "El cliente 0 hizo la compra exitosamente", 
                dialogOpen: false, 
                selectedCar: {} });
            }

          });
        }
      );
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleCloseDialog = () => {
    this.setState(state => ({ dialogOpen: !state.dialogOpen }));
  };

  handleTextChange = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };

  renderSnackbar = () =>{
    const { open, message } = this.state;
    return(
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
    );
  };

  render() {
    const { autos, clientes } = this.props;

    const { 
      dialogOpen, 
      selectedCar, 
      cliente, 
      comment, 
      montoTotal, 
      tipoPago, 
    } = this.state;

    return (
      <DashboardLayout>
        <Title>Vender</Title>
        <Grid container spacing={2} justify="center">
          {autos.map(auto => {
            
            return (
              <Grid item key={auto._id} xs={12} sm={6} md={4}>
                <ItemCard
                  title={`Marca: ${auto.marca}`}
                  body={`Modelo: ${auto.modelo}`}
                  description={`Estado: ${Estados[auto.estado]}`}
                  labelButton="Comprar"
                  image={(() => {
                    try {
                      return AutosFiles.findOne({ _id: auto.pictures[0] }).link();
                    } catch (error) {
                      return undefined;
                    }
                  })()}
                  action1={() => {
                    
                  }}
                  action2={() => {
                    this.setState(state => ({ dialogOpen: !state.dialogOpen, selectedCar: auto }));
                  }}
                  />
              </Grid>
            );
          })}
        </Grid>
        <Dialog
          open={dialogOpen}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            {`Seguro quiere comprar el auto marca: ${selectedCar.marca}`}
          </DialogTitle>

          <DialogContent>
            <form id="formUserLogin" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="selectCliente">Cliente</InputLabel>
                  <Select
                    id="selectCliente"
                    fullWidth
                    name="cliente"
                    value={cliente}
                    onChange={event => this.handleTextChange(event, "cliente")}
                    variant="outlined"
                    >
                    <MenuItem value="0">Consumidor Final</MenuItem>
                    {clientes.map(clienteact => {
                      return (
                        <MenuItem value={clienteact._id}>
                          {`${clienteact.nombre} ${clienteact.apellido}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="selectPayment">Tipo de pago</InputLabel>
                  <Select
                    id="selectPayment"
                    fullWidth
                    name="selectPayment"
                    value={tipoPago}
                    onChange={event => this.handleTextChange(event, "tipoPago")}
                    variant="outlined"
                    >
                    <MenuItem value="Credito">Crédito</MenuItem>
                    <MenuItem value="Efectivo">Efectivo</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="brand"
                    name="monto"
                    variant="outlined"
                    required
                    fullWidth
                    id="Brand"
                    label="Monto"
                    autoFocus
                    value={montoTotal}
                    onInput={event => this.handleTextChange(event, "montoTotal")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="comment">Comentario</InputLabel>
                  <TextareaAutosize
                    id="comment"
                    name="comment"
                    variant="outlined"
                    aria-label="minimum height"
                    rowsMin={4}
                    placeholder="Escriba un comentario..."
                    value={comment}
                    onChange={event => this.handleTextChange(event, "comment")}
                    />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleCreate} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        {this.renderSnackbar()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Autos.all");
  Meteor.subscribe("clientes.all");
  Meteor.subscribe("historial.all");
  return {
    autos: Autos.find({ estado: 2 }).fetch(),
    clientes: Cliente.find({}).fetch(),
  };
})(Vender);
