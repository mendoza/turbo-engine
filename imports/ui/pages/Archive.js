import React, { PureComponent } from "react";
import {
  Grid,
  Box,
  Button,
  Snackbar,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextareaAutosize,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  InputLabel,
  MenuItem,
  Input,
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

import { withTracker } from "meteor/react-meteor-data";

import DashboardLayout from "../layouts/DashboardLayout";

import Title from "../components/Title";
import ArchiveFiles from "../../api/collections/ArchiveFiles/ArchiveFiles";
import Archivo from "../../api/collections/Archive/Archive";

class Archive extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
      showToast: false,
      message: "",
      searchByNames: "",
      editId: undefined,
      showCreateArchiveDialog: false,
      showArchiveDialog: false,
      showDeleteDialog: false,

      Nombre: "",
      Comentario: "",
      Files: [],
      Pictures: [],
    };
  }
  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value })
  }

  // ========================================================================
  // ========================= Set files ====================================
  // ========================================================================

  setFiles = async event => {
    const { files } = event.target[3];
    let uploaded = 0;
    const fileIds = [];
    if (files.length <=0 ){
      this.setState({
        showToast: true,
        message: "Ingrese a lo menos un archivo"
      });
    }
    Object.keys(files).forEach(key => {
      const uploadFile = files[key];
      if (uploadFile) {
        // We upload only one file, in case
        // multiple files were selected
        const upload = ArchiveFiles.insert(
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
                uploaded: false,
                showToast: true,
                message: "No se pudo subir el archivo",
              });
            }
          } else {
            uploaded += 1;
            fileIds.push(fileObj._id);
            if (uploaded === files.length) {
              this.setState(
                {
                  uploaded: true,
                  Files: fileIds,
                },
                () => {
                  const { Nombre, Comentario, Files, editId } = this.state;
                  let alert;
                  const temp = Archivo.find({ nombre: Nombre });
                  temp.forEach((element) => {
                    if (Nombre === element.nombre) {
                      alert = "Este elemento ya existe, cambiar el nombre a uno distinto";
                    }
                  });
                  if (alert) {
                    this.setState({
                      showToast: true,
                      message: alert,
                    });
                  } else {
                    Meteor.call(
                      "addArchive",
                      {
                        _id: editId,
                        nombre: Nombre,
                        comentario: Comentario,
                        pictures: Files,
                      },
                      err => {
                        if (err) {
                          this.setState({
                            showToast: true,
                            message: "Ha ocurrido un error al crear el nuevo elemento",
                          });
                        } else {
                          this.setState({
                            showToast: true,
                            message: "Elemento creado exitosamente",
                            showCreateArchiveDialog: false,
                            Nombre: "",
                            Comentario: "",
                            Files: [],
                            Pictures: [],
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        });
        upload.start();
      }
    });
  };

  // ========================================================================
  // ========================= Render =======================================
  // ========================================================================

  renderArchiveDialog = () => {
    const { showArchiveDialog, Nombre, Comentario, Pictures } = this.state;
    return (
      <Dialog
        open={showArchiveDialog}
        onClose={() => {
          this.setState({ showArchiveDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <DialogTitle id="form-dialog-title">Archivo</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Title>Nombre</Title>
              {Nombre}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Comentario</Title>
              {Comentario}
            </Grid>
          </Grid>
        </DialogContent>
        <Grid container>
          {Pictures.map(imageId => {
            try {
              return (
                <Grid key={imageId} item xs={12} md={6}>
                  <Box padding="1rem" width="100%" style={{ textAlign: "right" }}>
                    <img
                      src={ArchiveFiles.findOne({ _id: imageId }).link()}
                      alt=" Archivo PDF "
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                    <Button variant="contained" color="primary" onClick={() => { }}>
                      <a
                        style={{ textDecoration: "none", color: "inherit" }}
                        download ={Nombre}
                        href={ArchiveFiles.findOne({ _id: imageId }).link()}>
                        Descarga
                      </a>
                    </Button>
                  </Box>
                </Grid>
              );
            } catch (error) {
              return undefined;
            }
          })}
        </Grid>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ showArchiveDialog: false });
            }}
            color="primary"
            variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderCreateArchiveDialog = () => {
    const { showCreateArchiveDialog, editId, Nombre, Comentario, Pictures } = this.state;
    return (
      <Dialog
        open={showCreateArchiveDialog}
        onClose={() => {
          this.setState({ showCreateArchiveDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <form onSubmit={this.handleCreate}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            Imagen
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  onInput={event => {
                    this.handleTextInput(event, "Nombre");
                  }}
                  name="nombre"
                  label="Nombre"
                  value={Nombre}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextareaAutosize
                  onInput={event => {
                    this.handleTextInput(event, "Comentario");
                  }}
                  placeholder="Escriba un comentario..."
                  name="comentario"
                  label="Comentario"
                  value={Comentario}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box paddingY="1rem">
                  Imagenes o archivos
                  <br />
                  <input type="file" multiple />
                </Box>
                <Divider />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  showCreateArchiveDialog: false,
                  Nombre: "",
                  Comentario: "",
                  Files: [],
                  Pictures: [],
                });
              }}
              color="primary"
              variant="contained">
              Cancelar
            </Button>
            <Button
             color="primary" variant="contained" type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  renderDeleteDialog = () => {
    const { showDeleteDialog } = this.state;
    return (
      <Dialog
        open={showDeleteDialog}
        onClose={() => {
          this.setState({ showDeleteDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          ¿Está seguro que desea eliminar este elemento?
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              Esta acción es irreversible.
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ showDeleteDialog: false });
            }}
            color="primary"
            variant="contained">
            Cancelar
          </Button>
          <Button color="primary" variant="contained" onClick={this.handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderArchiveTable = () => {
    const { archivos } = this.props;
    const { searchByNames } = this.state;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archivos.map(archivo => {
            const searchRegex = new RegExp(
              searchByNames.split(/ /).filter(l => l !== '').join('|'),
              'i'
            );
            const r1 = archivo && archivo.nombre.search(searchRegex);
            if (r1 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            }
            if (archivo) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={archivo.nombre}>
                  <TableCell component="th" scope="row">
                    {archivo.nombre}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="center"
                          onClick={() => {
                            this.setState({
                              editId: archivo._id,
                              showArchiveDialog: true,
                              Nombre: archivo.nombre,
                              Comentario: archivo.comentario,
                              Pictures: archivo.pictures,
                            });
                          }}
                          aria-label="centered">
                          <i className="fas fa-search" />
                        </ToggleButton>
                        <ToggleButton
                          value="right"
                          aria-label="right aligned"
                          onClick={() => {
                            this.setState({
                              editId: archivo._id,
                              showDeleteDialog: true,
                            });
                          }}>
                          <i className="fas fa-trash" />
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
            return <></>;
          })}
        </TableBody>
      </Table>
    );
  };

  renderSnackbar = () => {
    const { showToast, message } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={showToast}
        autoHideDuration={6000}
        onClose={() => {
          this.setState({ showToast: false });
        }}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => {
              this.setState({ showToast: false });
            }}>
            <i className="fas fa-times" />
          </IconButton>,
        ]}
      />
    );
  };

  // ========================================================================
  // ========================= Handle =======================================
  // ========================================================================

  handleSearchName = event => {
    this.setState({ searchByNames: event.target.value });
  };

  handleCreate = async e => {
    e.preventDefault();
    e.persist();
    this.setFiles(e);
  };

  handleDelete = () => {
    const { editId } = this.state;
    Meteor.call("deleteArchive", { _id: editId }, error => {
      if (error) {
        this.setState({
          showToast: true,
          message: "Ha ocurrido un error al eliminar el elemento",
        });
      } else {
        this.setState({
          showDeleteDialog: false,
          showToast: true,
          message: "Elemento eliminado exitosamente",
        });
      }
    });
  };

  handleTextInput = (event, stateName) => {
      this.setState({
        [stateName]: event.target.value,
      });
  };

  render() {
    return (
      <DashboardLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ width: '50%' }}
              label="Filtro por Nombre y Apellido"
              onInput={this.handleSearchName}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ showCreateArchiveDialog: true, editId: undefined });
              }}>
              Agregar Imagenes
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderArchiveTable()}
          </Grid>
        </Grid>
        {this.renderSnackbar()}
        {this.renderCreateArchiveDialog()}
        {this.renderArchiveDialog()}
        {this.renderDeleteDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Archive.all");
  Meteor.subscribe("ArchiveFiles.all");
  return {
    archivos: Archivo.find({}).fetch(),
    archivosFiles: ArchiveFiles.find().fetch(),
  };
})(Archive);

/*
        <Grid container xs={12}>
          <Grid item xs={12}>
            <form
              onSubmit={async e => {
                e.preventDefault();
                e.persist();
                await this.setFiles(e);
              }}>
              <TextField
                required
                value={nombre}
                onChange={e => {
                  this.setState({ [e.target.name]: e.target.value });
                }}
                name="nombre"
                label="Nombre"
                fullWidth
              />
              <Input type="file" fullWidth multiple />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Subir archivos
              </Button>
            </form>
          </Grid>
        </Grid>
*/
