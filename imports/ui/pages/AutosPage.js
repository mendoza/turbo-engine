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
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import MaskedTextField from "../components/MaskedTextField";
import Autos from "../../api/collections/Autos/Autos";
import DashboardLayout from "../layouts/DashboardLayout";
import ItemCard from "../components/ItemCard";
import AutosFiles from "../../api/collections/AutosFiles/AutosFiles";
import Title from "../components/Title";
import Piezas from "../../api/collections/Piezas/Piezas";
import { Estados, Traccion, Transmision, Tipo } from "../Constants";

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
      shouldOpen: false,
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
      open: false,
      message: "",
      showX: false,
      pathName: "",
      shouldRedirect: false,
      shouldRenderFull: false,
      pictures: [],
      filteredCars: [],
      uploaded: true,
      vin: "",
      files: [],
    };
  }

  setFiles = event => {
    const { files } = event.target;
    let uploaded = 0;
    const fileIds = [];
    Object.keys(files).forEach(key => {
      const uploadFile = files[key];
      if (uploadFile) {
        // We upload only one file, in case
        // multiple files were selected
        const upload = AutosFiles.insert(
          {
            file: uploadFile,
            streams: "dynamic",
            chunkSize: "dynamic",
          },
          false
        );
        upload.on("start", () => {
          this.setState({
            uploaded: false,
          });
        });
        upload.on("end", (error, fileObj) => {
          if (error) {
            uploaded += 1;
            if (uploaded === files.length) {
              this.setState({
                uploaded: true,
              });
            }
            console.log(error);
          } else {
            uploaded += 1;
            fileIds.push(fileObj._id);
            if (uploaded === files.length) {
              this.setState({
                uploaded: true,
                files: fileIds,
              });
            }
          }
        });
        upload.start();
      }
    });
  };

  componentWillReceiveProps = props => {
    if (props.autos) {
      this.setState({ filteredCars: props.autos });
    }
  };

  handleClose = () => {
    this.setState({
      shouldOpen: false,
    });
  };

  render() {
    const { classes, autos, autosFiles, allPiezas } = this.props;

    const {
      shouldOpen,
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
      vin,
      pictures,
      piezas,
      shouldRenderFull,
      filteredCars,
      uploaded,
      files,
    } = this.state;

    const handleCloseDialog = () => {
      this.setState({ shouldRender: false });
    };

    const handleCloseFullDialog = () => {
      this.setState({ shouldRenderFull: false });
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

      if (validator.isEmpty(color)) {
        alert = "El campo color es requerido";
      }

      if (validator.isEmpty(placa)) {
        alert = "El campo placa es requerido";
      }

      if (validator.isEmpty(String(year))) {
        alert = "El campo año es requerido";
      }

      if (year > new Date().getFullYear() + 1) {
        alert = "El año no puede ser mayor al año actual";
      }

      if (Autos.find({ placa }).count() > 1) {
        alert = "La placa debe ser unica para este auto";
      }

      if (alert) {
        this.setState({
          open: true,
          message: alert,
        });
      } else {
        // Falta agregar las piezas actualizadas al carro, piezas está vacio
        allPiezas.map(pieza => {
          Meteor.call("updatePieza", {
            _id: pieza._id,
            $set: {
              cantidad: pieza.cantidad,
            },
          });
        });
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
          piezas,
          pictures: [...files, ...pictures],
        });
        this.setState({
          open: true,
          message: "Auto Actualizado exitosamente",
          shouldRender: false,
          shouldOpen: false,
        });
      }
    };

    const Status = status => {
      if (parseInt(status, 10) === 0) {
        return "Aún no en reparación";
      }
      if (parseInt(status, 10) === 1) {
        return "Reparado";
      }
      if (parseInt(status, 10) === 2) {
        return "En venta";
      }
      if (parseInt(status, 10) === 3) {
        return "Vendido";
      }
      return "Sin especificar";
    };

    const shouldRenderCard = (label, list1, list2, pieza, index) => {
      return (
        <Grid item key={pieza.vendedor + pieza.tipo + index} xs={12} sm={6} md={4}>
          <ItemCard
            labelButton={label}
            showX={showX}
            title={`Tipo: ${pieza.tipo}`}
            body={`Vendedor: ${pieza.vendedor}`}
            description={`Cantidad: ${pieza.cantidad}`}
            action1={() => {}}
            action2={() => {
              let contains = false;
              let indexAuto = 0;
              for (let i = 0; i < list1.length; i++) {
                if (
                  list1[i].marca === pieza.marca &&
                  list1[i].vendedor === pieza.vendedor &&
                  list1[i].precio === pieza.precio &&
                  list1[i].numeroDeSerie === pieza.numeroDeSerie &&
                  list1[i].tipo === pieza.tipo
                ) {
                  contains = true;
                  indexAuto = i;
                }
              }
              if (contains) {
                pieza.cantidad -= 1;
                list1[indexAuto].cantidad += 1;
                if (pieza.cantidad === 0) {
                  if (index > -1) {
                    list2.splice(index, 1);
                  }
                }
              } else {
                list1.push({ ...pieza, cantidad: 1 });
                pieza.cantidad -= 1;
              }
              this.forceUpdate();
              this.setState({ showX: false });
            }}
            action3={() => {}}
          />
        </Grid>
      );
    };

    return (
      <DashboardLayout>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Autos
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Seccion para trabajar Autos
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
                    Agregar otro Auto
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    Toolbar
                    onClick={() => {
                      this.setState(state => {
                        return { showX: !state.showX };
                      });
                    }}>
                    Eliminar un Auto
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
                        this.setState({ filteredCars: autos });
                        this.setState({
                          filteredCars: autos.filter(car => {
                            console.log(
                              car.marca.toLowerCase().includes(value) ||
                                car.modelo.toLowerCase().includes(value) ||
                                Estados[car.estado].toLowerCase().includes(value)
                            );
                            return (
                              car.marca.toLowerCase().includes(value) ||
                              car.modelo.toLowerCase().includes(value) ||
                              Estados[car.estado].toLowerCase().includes(value)
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
            {filteredCars.map(auto => (
              <Grid item key={auto._id} xs={12} sm={6} md={4}>
                {console.log(auto.piezas)}
                <ItemCard
                  showX={showX}
                  title={`Marca: ${auto.marca}`}
                  body={`Modelo: ${auto.modelo}`}
                  description={`Estado: ${Estados[auto.estado]}`}
                  labelButton="Modificar"
                  image={(() => {
                    try {
                      return AutosFiles.findOne({ _id: auto.pictures[0] }).link();
                    } catch (error) {
                      return undefined;
                    }
                  })()}
                  action1={() => {}}
                  action2={() => {
                    this.setState({ shouldRender: true, dialogCar: auto, ...auto });
                  }}
                  action3={() => {
                    Meteor.call("deleteAuto", { ...auto });
                    this.setState({ showX: false });
                  }}
                  action4={() => {
                    this.setState({ shouldRenderFull: true, dialogCar: auto });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Dialog open={shouldRender} onClose={handleCloseDialog} maxWidth="lg">
          <DialogTitle>Modificar Auto</DialogTitle>
          <Divider />
          <DialogContent dividers>
            <form id="formUserLogin" noValidate>
              <Grid container spacing={2} style={{ marginBottom: "5px" }}>
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
                  <Select
                    fullWidth
                    name="tipo"
                    value={tipo}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Tipo.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="transmision"
                    value={transmision}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Transmision.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
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
                  <MaskedTextField
                    mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, " ", /\d/, /\d/, /\d/, /\d/]}
                    value={placa}
                    name="placa"
                    onChange={handleTextChange}
                    label="Placa"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="traccion"
                    value={traccion}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Traccion.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaskedTextField
                    mask={[/\d/, /\d/, /\d/, /\d/]}
                    value={year}
                    name="year"
                    onChange={handleTextChange}
                    label="Año"
                  />
                </Grid>
                <Grid item sm={12}>
                  <Select
                    fullWidth
                    name="estado"
                    value={estado}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Estados.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item sm={12}>
                  <MaskedTextField
                    mask={[
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                    ]}
                    value={vin}
                    name="vin"
                    onChange={handleTextChange}
                    label="VIN"
                  />
                </Grid>
              </Grid>
              <Button
                onClick={() => {
                  this.setState({
                    shouldOpen: true,
                  });
                }}>
                Cambiar piezas
              </Button>
              <Box paddingY="1rem">
                Agregar imagenes
                <br />
                <input type="file" onChange={this.setFiles} multiple />
              </Box>
              <Grid item xs={12}>
                Imagenes del auto
              </Grid>
              <Grid container>
                {console.log("id de las imagenes:", pictures)}
                {pictures.map(imageId => {
                  try {
                    return (
                      <Grid key={imageId} item xs={12} md={6}>
                        <Box padding="1rem" width="100%" style={{ textAlign: "right" }}>
                          <img
                            src={AutosFiles.findOne({ _id: imageId }).link()}
                            alt="Auto"
                            style={{ width: "100%", objectFit: "contain" }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              Meteor.call("deleteAutoPicture", imageId);
                            }}>
                            Eliminar
                          </Button>
                        </Box>
                      </Grid>
                    );
                  } catch (error) {
                    return undefined;
                  }
                })}
              </Grid>
              <Button
                disabled={!uploaded}
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCreate}>
                Actualizar
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog fullScreen open={shouldOpen} onClose={this.handleClose}>
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close">
                <i className="fas fa-times-circle" />
              </IconButton>
              <Typography variant="h6">Piezas</Typography>
              <Button autoFocus color="inherit" onClick={this.handleClose}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent container>
            <Title> </Title>
            <Grid container spacing={4}>
              {dialogCar &&
                dialogCar.piezas &&
                allPiezas.map((pieza, index) => {
                  try {
                    return pieza.cantidad > 0
                      ? shouldRenderCard("Agregar", dialogCar.piezas, allPiezas, pieza, index)
                      : null;
                  } catch (error) {
                    return undefined;
                  }
                })}
            </Grid>
          </DialogContent>
          <Divider />
          <DialogContent>
            <Title>Piezas agregadas</Title>
            <Grid container spacing={4}>
              {dialogCar &&
                dialogCar.piezas &&
                dialogCar.piezas.map((pieza, index) => {
                  try {
                    return pieza.cantidad > 0
                      ? shouldRenderCard("Eliminar", allPiezas, dialogCar.piezas, pieza, index)
                      : null;
                  } catch (error) {
                    return undefined;
                  }
                })}
            </Grid>
          </DialogContent>
        </Dialog>

        <Dialog open={shouldRenderFull} onClose={handleCloseFullDialog} maxWidth="lg">
          <DialogTitle>Auto</DialogTitle>
          <Divider />
          <DialogContent dividers>
            <Grid container>
              <Grid item sm={6}>
                <Title>Marca: </Title>
                <Typography>{`${dialogCar.marca}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Modelo: </Title>

                <Typography>{` ${dialogCar.modelo}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Tipo: </Title>

                <Typography>{` ${dialogCar.tipo}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Transmision: </Title>
                <Typography>{`${Transmision[dialogCar.transmision]}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Color: </Title>

                <Typography>{`${dialogCar.color}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Placa: </Title>
                <Typography>{`${dialogCar.placa}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Traccion: </Title>
                <Typography>{`${Traccion[dialogCar.traccion]}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Title>Año: </Title>
                <Typography>{`${dialogCar.year}`}</Typography>
              </Grid>
              {console.log(dialogCar.pictures)}
              {dialogCar &&
                dialogCar.pictures &&
                dialogCar.pictures.map(imageId => {
                  try {
                    return (
                      <Grid key={imageId} item xs={12} md={6}>
                        <Box padding="1rem" width="100%" style={{ textAlign: "right" }}>
                          <img
                            src={AutosFiles.findOne({ _id: imageId }).link()}
                            alt="Auto"
                            style={{ width: "100%", objectFit: "contain" }}
                          />
                        </Box>
                      </Grid>
                    );
                  } catch (error) {
                    console.log(error);
                    return undefined;
                  }
                })}
            </Grid>
            <Title>Piezas: </Title>
            <Grid containers>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Marca</TableCell>
                    <TableCell align="right">Vendedor</TableCell>
                    <TableCell align="right">Tipo</TableCell>
                    <TableCell align="right">Número de serie</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dialogCar &&
                    dialogCar.piezas &&
                    dialogCar.piezas.map(pieza => {
                      try {
                        return (
                          <TableRow key={pieza.marca}>
                            <TableCell component="th" scope="row">
                              {pieza.marca}
                            </TableCell>
                            <TableCell align="right">{pieza.vendedor}</TableCell>
                            <TableCell align="right">{pieza.tipo}</TableCell>
                            <TableCell align="right">{pieza.numeroDeSerie}</TableCell>
                            <TableCell align="right">{pieza.cantidad}</TableCell>
                            <TableCell align="right">{pieza.precio}</TableCell>
                          </TableRow>
                        );
                      } catch (error) {
                        return undefined;
                      }
                    })}
                </TableBody>
              </Table>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFullDialog} color="primary">
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
  Meteor.subscribe("AutosFiles.all");
  Meteor.subscribe("Piezas.all");
  return {
    autos: Autos.find().fetch(),
    autosFiles: AutosFiles.find().fetch(),
    allPiezas: Piezas.find().fetch(),
  };
})(withStyles(useStyles)(AutosPage));
