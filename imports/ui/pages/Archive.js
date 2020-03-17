import React, { PureComponent } from "react";
import { Grid, Input, Button, Snackbar, IconButton } from "@material-ui/core";
import DashboardLayout from "../layouts/DashboardLayout";
import ArchiveFiles from "../../api/collections/ArchiveFiles/ArchiveFiles";

class Archive extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploaded: false,
      showToast: false,
      message: "",
    };
  }

  setFiles = event => {
    const { files } = event;
    let uploaded = 0;
    const fileIds = [];
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
            showToast: true,
            message: "El archivo esta siendo subido",
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
            console.log(error);
          } else {
            uploaded += 1;
            fileIds.push(fileObj._id);
            if (uploaded === files.length) {
              this.setState({
                uploaded: true,
                showToast: true,
                message: "Archivo subido exitosamente",
                files: fileIds,
              });
            }
          }
        });
        upload.start();
      }
    });
  };

  render() {
    const { showToast, message } = this.state;
    return (
      <DashboardLayout>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <form
              onSubmit={e => {
                e.preventDefault();
                e.persist();
                this.setFiles(e.target[0]);
              }}>
              <Input type="file" fullWidth multiple />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Subir archivos
              </Button>
            </form>
          </Grid>
        </Grid>
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
      </DashboardLayout>
    );
  }
}
export default Archive;