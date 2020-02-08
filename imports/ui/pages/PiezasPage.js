import React, { PureComponent } from "react";
import {
  Button,
  Grid,
  Typography,
  Container,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import Piezas from "../../api/collections/Piezas/Piezas";
import DashboardLayout from "../layouts/DashboardLayout";
import ItemCard from "../components/ItemCard";
import Tipos from "../../api/collections/Tipos/Tipos";
import Title from "../components/Title";

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

class PiezasPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
      dialogPiece: {},
      marca: "",
      vendedor: "",
      precio: "",
      numeroDeSerie: "",
      tipo: "",
      cantidad: "",
      moneda: "",
      open: false,
      message: "",
      showX: false,
      pathName: "",
      shoudlRedirect: false,
      shouldRenderFull: false,
      filteredPieces: [],
    };
  }

  componentWillReceiveProps = props => {
    if (props.piezas) {
      this.setState({ filteredPieces: props.piezas });
    }
  };

  handleClose = () => {
    this.setState({ shouldRender: false });
  };

  handleCloseFullDialog = () => {
    this.setState({ shouldRenderFull: false });
  };

  handleBar = () => {
    this.setState({
      open: false,
    });
  };

  handleTextChange = event => {
    console.log({
      [event.target.name]: event.target.value,
    })
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = () => {
    const {
      marca,
      vendedor,
      precio,
      numeroDeSerie,
      tipo,
      cantidad,
      moneda,
      dialogPiece,
    } = this.state;
    let alert;

    if (validator.isEmpty(marca)) {
      alert = "El campo marca es requerido";
    }
    if (validator.isEmpty(tipo)) {
      alert = "El campo tipo es requerido";
    }
    if (validator.isEmpty(precio)) {
      alert = "El campo precio es requerido";
    }
    if (validator.isEmpty(numeroDeSerie)) {
      alert = "El numero de serie es requerido";
    }
    if (Piezas.find({ numeroDeSerie }).count() > 0) {
      alert = "El numero de serie debe ser unico para esta pieza";
    }
    if (validator.isEmpty(vendedor)) {
      alert = "El campo vendedor es requerido";
    }
    if (validator.isEmpty(cantidad)) {
      alert = "El campo cantidad es requerido";
    }
    if (!validator.isNumeric(precio)) {
      alert = "El campo precio solo debe contener números";
    } else if (precio < 1) {
      alert = "El precio no puede ser cero o un número negativo";
    }
    if (!validator.isNumeric(cantidad)) {
      alert = "El campo cantidad solo debe contener números";
    } else if (cantidad < 1) {
      alert = "La cantidad no puede ser cero o un número negativo";
    }
    if (validator.isEmpty(cantidad)) {
      alert = "La seleccion de moneda es requerida";
    }

    if (alert) {
      this.setState({
        open: true,
        message: alert,
      });
    } else {
      Meteor.call("updatePieza", {
        _id: dialogPiece._id,
        marca,
        vendedor,
        precio,
        numeroDeSerie,
        tipo,
        cantidad,
        moneda,
      });
      this.setState({
        open: true,
        message: "Pieza actualizada exitosamente",
        shouldRender: false,
      });
    }
  };

  render() {
    const { classes, piezas, tipos } = this.props;
    const {
      shouldRender,
      dialogPiece,
      marca,
      vendedor,
      precio,
      numeroDeSerie,
      tipo,
      cantidad,
      moneda,
      open,
      message,
      showX,
      pathName,
      shoudlRedirect,
      shouldRenderFull,
      filteredPieces,
    } = this.state;

    return (
      <DashboardLayout>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom>
                Piezas
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Seccion para trabajar Piezas
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.setState({ pathName: "agregarPiezas", shoudlRedirect: true });
                      }}>
                      Agregar otra Pieza
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
                      Eliminar una Pieza
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="standard-adornment-amount">Busqueda</InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        onChange={event => {
                          event.preventDefault();
                          let { value } = event.target;
                          value = value.toLowerCase();
                          this.setState({ filteredPieces: piezas });
                          this.setState({
                            filteredPieces: piezas.filter(piece => {
                              return (
                                piece.tipo.toLowerCase().includes(value) ||
                                piece.vendedor.toLowerCase().includes(value)
                              );
                            }),
                          });
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <span className="fas fa-search" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {filteredPieces.map(pieza => (
                <Grid item key={pieza._id} xs={12} sm={6} md={4}>
                  <ItemCard
                    showX={showX}
                    title={`Tipo: ${pieza.tipo}`}
                    body={`Vendedor: ${pieza.vendedor}`}
                    labelButton="Modificar"
                    action1={() => {}}
                    action2={() => {
                      this.setState({ shouldRender: true, dialogPiece: pieza, ...pieza });
                    }}
                    action3={() => {
                      Meteor.call("deletePieza", { ...pieza });
                      this.setState({ showX: false });
                    }}
                    action4={() => {
                      this.setState({ shouldRenderFull: true, dialogPiece: pieza });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Dialog open={shouldRender} onClose={this.handleClose}>
            <DialogTitle>Modificar Pieza</DialogTitle>
            <Divider />
            <DialogContent dividers>
              <form id="formUserLogin" noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="brand"
                      name="marca"
                      variant="outlined"
                      required
                      fullWidth
                      id="Brand"
                      label="Marca"
                      autoFocus
                      value={marca}
                      onInput={event => this.handleTextChange(event, "marca")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="seller"
                      name="vendedor"
                      variant="outlined"
                      required
                      fullWidth
                      id="Seller"
                      label="Vendedor"
                      value={vendedor}
                      onInput={event => this.handleTextChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="serieNum"
                      name="numeroDeSerie"
                      variant="outlined"
                      required
                      fullWidth
                      id="SerieNumber"
                      label="NumeroDeSerie"
                      value={numeroDeSerie}
                      onInput={event => this.handleTextChange(event)}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Select
                      fullWidth
                      required
                      name="moneda"
                      label="Moneda"
                      id="currency"
                      value={moneda}
                      onChange={event => this.handleTextChange(event)}>
                      <MenuItem key={0} value="$">
                        $
                      </MenuItem>
                      <MenuItem key={1} value="L.">
                        L.
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <TextField
                      autoComplete="price"
                      name="precio"
                      variant="outlined"
                      required
                      fullWidth
                      id="Price"
                      label="precio"
                      value={precio}
                      onInput={event => this.handleTextChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="quantity"
                      name="cantidad"
                      variant="outlined"
                      required
                      fullWidth
                      id="Quantity"
                      label="cantidad"
                      value={cantidad}
                      onInput={event => this.handleTextChange(event, "cantidad")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      name="tipo"
                      fullWidth
                      required
                      label="Tipo"
                      id="type"
                      value={tipo}
                      onChange={event => this.handleTextChange(event, "tipo")}>
                      {tipos.map(tipoMap => {
                        if (tipoMap) {
                          return (
                            <MenuItem key={tipoMap._id} value={tipoMap.nombre}>
                              {tipoMap.nombre}
                            </MenuItem>
                          );
                        }
                        return <></>;
                      })}
                    </Select>
                  </Grid>
                  <Button fullWidth variant="contained" color="primary" onClick={this.handleClick}>
                    Modificar
                  </Button>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={shouldRenderFull} onClose={this.handleCloseFullDialog} maxWidth="lg">
            <DialogTitle>Pieza</DialogTitle>
            <Divider />
            <DialogContent dividers>
              <Grid container>
                <Grid item sm={6}>
                  <Title>Marca: </Title>
                  <Typography>{`${dialogPiece.marca}`}</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Title>Vendedor: </Title>
                  <Typography>{`${dialogPiece.vendedor}`}</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Title>Precio: </Title>
                  <Typography>{`${dialogPiece.precio}`}</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Title>Numero de Serie: </Title>
                  <Typography>{`${dialogPiece.numeroDeSerie}`}</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Title>Tipo: </Title>
                  <Typography>{`${dialogPiece.tipo}`}</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Title>Cantidad: </Title>
                  <Typography>{`${dialogPiece.cantidad}`}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseFullDialog} color="primary">
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
            onClose={this.handleBar}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">{message}</span>}
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleBar}>
                <i className="fas fa-times" />
              </IconButton>,
            ]}
          />
        </main>
        {shoudlRedirect ? <Redirect to={pathName} /> : null}
      </DashboardLayout>
    );
  }
}

export default withStyles(useStyles)(
  withTracker(() => {
    Meteor.subscribe("Piezas.all");
    Meteor.subscribe("Tipos.all");
    return {
      piezas: Piezas.find().fetch(),
      tipos: Tipos.find().fetch(),
    };
  })(PiezasPage)
);
