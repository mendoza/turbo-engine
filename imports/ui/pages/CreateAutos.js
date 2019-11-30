import React, { PureComponent } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
  Box,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import AutosFiles from "../../api/collections/AutosFiles/AutosFiles";

class CreateAutos extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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
        const upload = AutosFiles.insert({
          file: uploadFile,
          streams: 'dynamic',
          chunkSize: 'dynamic',
        }, false);
        upload.on('start', () => {
          this.setState({
            uploaded: false,
          });
        })
        upload.on('end', (error, fileObj) => {
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
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const handleTextChange = event => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const handleCreate = () => {
      const { marca, modelo, tipo, transmision, color,
        placa, traccion, year, estado, files } = this.state;
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
        Meteor.call("addAuto", {
          marca,
          modelo,
          tipo,
          transmision,
          color,
          placa,
          traccion,
          year,
          estado,
          piezas: [],
          pictures: files
        });
        this.setState({
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
      uploaded,
    } = this.state;

    return (
      <DashboardLayout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Autos
            </Typography>
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
                onClick={handleCreate}
                >
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
