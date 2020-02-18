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
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
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
      dialogOpen: false,
      selectedCar: {},
      cliente: "",
      comment: "",
    };
  }

  render() {
    const { autos, clientes } = this.props;
    const { dialogOpen, selectedCar, cliente, comment } = this.state;
    const handleClose = () => {
      this.setState(state => ({ dialogOpen: !state.dialogOpen }));
    };
    const handleTextChange = event => {
      event.persist();
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
    return (
      <DashboardLayout>
        <Title>Vender</Title>
        <Grid container spacing={2} justify="center">
          {autos.map(auto => {
            console.log(auto);
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
                    console.log("action 1");
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
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{`Seguro quiere comprar el auto marca: ${selectedCar.marca}`}</DialogTitle>
          <DialogContent>
            <Grid container xs={12}>
              <Grid item xs={12}>
                <InputLabel htmlFor="selectCliente">Cliente</InputLabel>
                <Select
                  id="selectCliente"
                  fullWidth
                  name="cliente"
                  value={cliente}
                  onChange={handleTextChange}
                  variant="outlined">
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
                <InputLabel htmlFor="comment">Comentario</InputLabel>
                <TextareaAutosize
                  id="comment"
                  name="comment"
                  variant="outlined"
                  aria-label="minimum height"
                  rowsMin={4}
                  placeholder="Minimum 3 rows"
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                Meteor.call(
                  "addHistorial",
                  {
                    cliente,
                    producto: selectedCar._id,
                    fecha: new Date().getTime(),
                    comentario: comment,
                  },
                  err => {
                    console.log(err);
                    Meteor.call("marcarComprado", selectedCar, error => {
                      if (cliente !== "0") {
                        Meteor.call(
                          "addSoldCar",
                          { carId: selectedCar._id, clientId: cliente },
                          error2 => {
                            this.setState({ dialogOpen: false, selectedCar: {} });
                          }
                        );
                      } else {
                        this.setState({ dialogOpen: false, selectedCar: {} });
                      }
                    });
                  }
                );
              }}
              color="primary"
              autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Autos.all");
  Meteor.subscribe("clientes.all");
  return {
    autos: Autos.find({ estado: 2 }).fetch(),
    clientes: Cliente.find({}).fetch(),
  };
})(Vender);
