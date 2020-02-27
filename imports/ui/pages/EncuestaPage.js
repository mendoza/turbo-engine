import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import Encuestas from "../../api/collections/Encuestas/Encuestas";

class EncuestaPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: false,

      Fecha: "",
      Score: "",
      Comentario: "",
    };
  }

  renderEncuestaDialog = () => {
    const {
      shouldRender,
      Fecha,
      Score,
      Comentario,
    } = this.state;
    return (
      <Dialog
        open={shouldRender}
        onClose={() => {
          this.setState({ shouldRender: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
          
        <DialogTitle id="form-dialog-title">
          Encuesta
        </DialogTitle>
          
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <pTextField
                label="Nombre"
                value={Fecha}
                required
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Apellido"
                value={Score}
                required
                fullWidth
                />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ shouldRender: false });
            }}
            color="primary"
            variant="contained">
            Cerrar
          </Button>
        </DialogActions>

      </Dialog>
    );
  };

  renderEncuestasTable = () => {
    const { encuestas } = this.props;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Puntuación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {encuestas.map(encuesta => {
            if (encuesta) {
              return (
                // eslint-disable-next-line no-underscore-dangle
                <TableRow key={encuesta.tipo}>
                  <TableCell component="th" scope="row">
                    {encuesta.fecha}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {encuesta.score}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <ToggleButtonGroup aria-label="text alignment">
                        <ToggleButton
                          value="left"
                          onClick={() => {
                            this.setState({ 
                              shouldRender: true,
                              Fecha: encuesta.fecha,
                              Score: encuesta.score,
                              Comentario: encuesta.comment,
                            });
                          }}
                          aria-label="left aligned">
                          <i className="fas fa-address-card" />
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

  render() {
    return (
      <DashboardLayout style={{ height: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderEncuestasTable()}
          </Grid>
        </Grid>
        {this.renderEncuestaDialog()}
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("encuestas.all");
  const encuestas = Encuestas.find().fetch();
  return {
    encuestas: encuestas && encuestas.reverse(),
  };
})(EncuestaPage);
