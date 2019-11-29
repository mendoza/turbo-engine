import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import Autos from "../../api/collections/Autos/Autos";
import DashboardLayout from "../layouts/DashboardLayout";
import ItemCard from "../components/ItemCard";

const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class AutosPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
      dialogCar: {},
      marca: "",
      modelo: "",
      tipo: "",
      transmision: "",
      color: "",
      placa: "",
      traccion: "",
      year: 0,
      piezas: [],
      estado: 0,
      _id: "",
      open: false,
      message: "",
      showX: false,
      pathName: "",
      shouldRedirect: false,
    };
  }

  render() {
    const { classes, autos } = this.props;

    const {
      shouldRender,
      dialogCar,
      marca,
      modelo,
      tipo,
      transmision,
      color,
      placa,
      traccion,
      year,
      estado,
      open,
      showX,
      message,
      pathName,
      shouldRedirect,
    } = this.state;

    const handleCloseDialog = () => {
      this.setState({ shouldRender: false });
    };

    const handleCloseSnack = () => {
      this.setState({ open: false });
    };

    const handleTextChange = event => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
    const handleCreate = () => {
      let alert;

      if (validator.isEmpty(marca)) {
        alert = "El campo marca es requerido";
      }

      if (validator.isEmpty(modelo)) {
        alert = "El campo modelo es requerido";
      }

      if (validator.isEmpty(tipo)) {
        alert = "El campo tipo es requerido";
      }

      if (validator.isEmpty(transmision)) {
        alert = "El campo transmision es requerido";
      }

      if (validator.isEmpty(color)) {
        alert = "El campo color es requerido";
      }

      if (validator.isEmpty(placa)) {
        alert = "El campo placa es requerido";
      }

      if (validator.isEmpty(traccion)) {
        alert = "El campo traccion es requerido";
      }

      if (validator.isEmpty(String(year))) {
        alert = "El campo año es requerido";
      }

      if (validator.isEmpty(String(estado))) {
        alert = "El campo estado es requerido";
      }

      if (alert) {
        this.setState({
          open: true,
          message: alert,
        });
      } else {
        Meteor.call("updateAuto", {
          _id: dialogCar._id,
          marca,
          modelo,
          tipo,
          transmision,
          color,
          placa,
          traccion,
          year,
          estado,
        });
        this.setState({
          open: true,
          message: "Auto Actualizado exitosamente",
          shouldRender: false,
        });
      }
    };

    const Status = status => {
      if (parseInt(status) === 0) {
        return "Aún no en reparación";
      }
      if (parseInt(status) === 1) {
        return "Reparado";
      }
      if (parseInt(status) === 2) {
        return "En venta";
      }
      if (parseInt(status) === 3) {
        return "Vendido";
      }
      return "Sin especificar";
    };

    return (
      <DashboardLayout>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Vehiculos
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum urna
              mauris, non tempus quam ultricies sit amet. Pellentesque pharetra et tellus aliquam
              malesuada.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({ shouldRedirect: true, pathName: "agregarAutos" });
                    }}>
                    Agregar otro Vehiculo
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      this.setState(state => {
                        return { showX: !state.showX };
                      });
                    }}>
                    Eliminar un Vehiculo
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {autos.map((auto, index) => (
              <Grid item key={auto.modelo + auto.marca + index} xs={12} sm={6} md={4}>
                <ItemCard
                  showX={showX}
                  title={`Marca: ${auto.marca}`}
                  body={`Modelo: ${auto.modelo}`}
                  description={`Estado: ${Status(auto.estado)}`}
                  action1={() => {}}
                  action2={() => {
                    this.setState({ shouldRender: true, dialogCar: auto, ...auto });
                  }}
                  action3={() => {
                    Meteor.call("deleteAuto", { ...auto });
                    this.setState({ showX: false });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Dialog open={shouldRender} onClose={handleCloseDialog}>
          <DialogTitle>Modificar Auto</DialogTitle>
          <Divider />
          <DialogContent dividers>
            <form id="formUserLogin" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="marca"
                    variant="outlined"
                    required
                    fullWidth
                    label="Marca"
                    autoFocus
                    value={marca}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="modelo"
                    variant="outlined"
                    required
                    fullWidth
                    label="Modelo"
                    autoFocus
                    value={modelo}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="tipo"
                    variant="outlined"
                    required
                    fullWidth
                    label="Tipo"
                    autoFocus
                    value={tipo}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="transmision"
                    variant="outlined"
                    required
                    fullWidth
                    label="Transmision"
                    autoFocus
                    value={transmision}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="color"
                    variant="outlined"
                    required
                    fullWidth
                    label="Color"
                    autoFocus
                    value={color}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="placa"
                    variant="outlined"
                    required
                    fullWidth
                    label="Placa"
                    autoFocus
                    value={placa}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="traccion"
                    variant="outlined"
                    required
                    fullWidth
                    label="Traccion"
                    autoFocus
                    value={traccion}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="year"
                    variant="outlined"
                    required
                    fullWidth
                    label="Año"
                    autoFocus
                    value={year}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="estado"
                    variant="outlined"
                    required
                    fullWidth
                    label="Estado"
                    autoFocus
                    value={estado}
                    onInput={handleTextChange}
                  />
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" color="primary" onClick={handleCreate}>
                Modificar
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
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
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseSnack}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
        {shouldRedirect ? <Redirect to={pathName} /> : null}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Autos.all");
  return {
    autos: Autos.find().fetch(),
  };
})(withStyles(useStyles)(AutosPage));
