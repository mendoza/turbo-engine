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
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

import validator from "validator";

import { withTracker } from "meteor/react-meteor-data";

import DashboardLayout from "../layouts/DashboardLayout";

import ArchiveFiles from "../../api/collections/ArchiveFiles/ArchiveFiles";
import Archivo from "../../api/collections/Archive/Archive"

class Archive extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      uploaded: false,
      showToast: false,
      message: "",

      editId: undefined,
      showArchiveDialog: false,
      showDeleteDialog: false,

      Nombre: "",
      Comentario: "",
      Files: [],
    };
  }

  renderArchiveDialog = () => {
    const {
      showArchiveDialog,
      editId,
      Nombre,
      Comentario,
      Files,
    } = this.state;
    return(
      <Dialog
        open={showArchiveDialog}
        onClose={() => {
          this.setState({ showArchiveDialog: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        >
        <form onSubmit={this.handleCreate}>
          <DialogTitle id="form-dialog-title">
            {editId ? "Editar " : "Agregar "}
            Archivo
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
                  <input type="file" onChange={this.setFiles} multiple />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ 
                  showArchiveDialog: false,
                  Nombre: "",
                  Comentario: "",
                  Files: [] });
              }}
              color="primary"
              variant="contained"
              >
              Cancelar
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

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
        fullWidth
        >
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
            variant="contained"
            >
            Cancelar
          </Button>
          <Button color="primary" variant="contained" onClick={this.handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  handleCreate = () => {
    const {
      Nombre,
      Comentario,
      Files,
      editId
    } = this.state;

    const NewArchive = {
      _id: editId,
      nombre: Nombre,
      comentario: Comentario,
      pictures: Files,
    };

    let alert;
    let methodName;

    if (editId) {
      methodName = "updateArchive"
    }else{
      methodName = "addArchive"
    }

    if(validator.isEmpty(Nombre)){
      alert = "Debe de haber por lo menos un nombre"
    }
    if(alert){
      this.setState({
        showToast: true,
        message: alert
      });
    }else{
      const temp = Archivo.find({nombre: Nombre});
      temp.forEach( ()=>{
        if (methodName === "addArchive"){
          alert = "Este elemento ya existe, cambiar el nombre a uno distinto";
        };
      });
      if(alert){
        this.setState({
          showToast: true,
          message: alert,
        });
        return;
      }
      Meteor.call(methodName, NewArchive, err => {
        if (err) {
          this.setState({
            showToast: true,
            message: "Ha ocurrido un error al crear el nuevo elemento",
          });
        }else{
          this.setState({
            showArchiveDialog: false,
            Nombre: "",
            Comentario: "",
            Files: [],
          });
        }
      });
    }
  };

  handleDelete = () => {
    const { editId } = this.state;
    Meteor.call("deleteArchive", editId, error => {
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

  handleTextInput = (event, stateName, validatorjs) => {
    if (validatorjs) {
      if (validatorjs(event.target.value) || event.target.value === "") {
        this.setState({
          [stateName]: event.target.value,
        });
      }
    } else {
      this.setState({
        [stateName]: event.target.value,
      });
    }
  };


  renderArchiveTable = () => {
    const { archivos } = this.props;
    // const { searchByNames } = this.state;
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
            /* const searchRegex = new RegExp(
              searchByNames.split(/ /).filter(l => l !== '').join('|'),
              'i'
            );
            const r1 = provider && provider.nombre.search(searchRegex);
            const r2 = provider && provider.apellido.search(searchRegex);

            if (r1 === -1 && r2 === -1 && searchByNames.length > 0) {
              return <TableRow />;
            } */
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
                            });
                          }}
                          aria-label="centered"
                          >
                          <i className="fas fa-pen" />
                        </ToggleButton>
                        <ToggleButton
                          value="right"
                          aria-label="right aligned"
                          onClick={() => {
                            this.setState({
                              editId: archivo._id,
                              showDeleteDialog: true,
                            });
                          }}
                          >
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
            }}
            >
            <i className="fas fa-times" />
          </IconButton>,
        ]}
        />
    );
  };

  setFiles = event => {
    const { Files } = event.target[1];
    let uploaded = 0;
    const fileIds = [];
    Object.keys(Files).forEach(key => {
      const uploadFile = Files[key];
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
            showToast: true,
            message: "El archivo esta siendo subido",
          });
        });
        upload.on("end", (error, fileObj) => {
          if (error) {
            uploaded += 1;
            if (uploaded === Files.length) {
              this.setState({
                uploaded: false,
                showToast: true,
                message: "No se pudo subir el archivo",
              });
            }
            console.log(error);
          } else {
            uploaded += 1;
            fileIds.push(fileObj._id);
            if (uploaded === Files.length) {
              this.setState(
                {
                  uploaded: true,
                  showToast: true,
                  message: "Archivo subido exitosamente",
                  Files: fileIds,
                },
                /* () => {
                  const { nombre, files } = this.state;
                  const payload = { nombre, files };
                  console.log(payload);
                  Meteor.call("addArchive", payload, err => {
                    console.log(err);
                  });
                } */
              );
            }
          }
        });
        upload.start();
      }
    });
  };

  render() {
    return (
      <DashboardLayout>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ width: '50%' }}
              label="Filtro por nombre"
              // onInput={this.handleSearchName}
              />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ showArchiveDialog: true, editId: undefined });
              }}
              >
              Agregar archivos
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.renderArchiveTable()}
          </Grid>
        </Grid>
        {this.renderSnackbar()}
        {this.renderArchiveDialog()}
        {this.renderDeleteDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Archive.all");
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