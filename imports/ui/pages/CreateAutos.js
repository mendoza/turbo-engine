import React, { PureComponent } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import { Estados, Traccion, Transmision } from "../Constants";
import MaskedTextField from "../components/MaskedTextField";
import AutosFiles from "../../api/collections/AutosFiles/AutosFiles";

class CreateAutos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      marca: "",
      modelo: "",
      tipo: "",
      transmision: 0,
      color: "",
      placa: "",
      traccion: 0,
      year: "",
      piezas: [],
      estado: 0,
      open: false,
      message: "",
      vin: "",
      files: [],
      uploaded: true,
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

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const handleTextChange = event => {
      event.persist();
      console.log(`${[event.target.name]}: ${event.target.value}`);
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const handleCreate = () => {
      const {
        marca,
        modelo,
        tipo,
        transmision,
        color,
        placa,
        traccion,
        year,
        estado,
        vin,
        files,
      } = this.state;
      let alert;
      console.log(this.state);

      if (validator.isEmpty(marca)) {
        alert = "El campo marca es requerido";
      }

      if (validator.isEmpty(modelo)) {
        alert = "El campo modelo es requerido";
      }

      if (validator.isEmpty(tipo)) {
        alert = "El campo tipo es requerido";
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

      if (validator.isEmpty(vin)) {
        alert = "El campo vin es requerido";
      }

      if (alert) {
        this.setState({
          open: true,
          message: alert,
        });
      } else {
        Meteor.call("addAuto", {
          marca,
          modelo,
          tipo,
          transmision: Transmision[transmision],
          color,
          placa,
          traccion: Traccion[traccion],
          year,
          estado: Estados[estado],
          piezas: [],
          vin,
          pictures: files,
        });
        this.setState({
          marca: "",
          modelo: "",
          tipo: "",
          transmision: 0,
          color: "",
          placa: "",
          traccion: 0,
          year: "",
          estado: 0,
          open: true,
          message: "Auto agregado exitosamente",
        });
      }
    };

    const {
      marca,
      modelo,
      tipo,
      transmision,
      color,
      placa,
      traccion,
      year,
      estado,
      message,
      open,
      vin,
      uploaded,
    } = this.state;

    return (
      <DashboardLayout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <i className="fas fa-car" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Autos
            </Typography>
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
              <Box paddingY="1rem">
                Imagenes del auto
                <br />
                <input type="file" onChange={this.setFiles} multiple />
              </Box>
              <Button
                disabled={!uploaded}
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCreate}>
                Crear
              </Button>
            </form>
          </div>
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

export default CreateAutos;
