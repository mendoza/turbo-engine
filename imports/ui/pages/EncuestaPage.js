import React, { Component } from "react";
import {
  Divider,
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
import Title from "../components/Title";

class EncuestaPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRender: false,
      searchByDate: "",
      Fecha: "",
      Score: "",
      Comentario: "",
    };
  }

  handleSearchDate = event => {
    this.setState({ searchByDate: event.target.value });
  };

  renderEncuestaDialog = () => {
    const { shouldRender, Fecha, Score, Comentario } = this.state;
    return (
      <Dialog
        open={shouldRender}
        onClose={() => {
          this.setState({ shouldRender: false });
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth>
        <DialogTitle id="form-dialog-title">Encuesta</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Title>Fecha</Title>
              {Fecha}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Score</Title>
              {Score}
            </Grid>
            <Grid item xs={12} md={6}>
              <Title>Comentario</Title>
              {Comentario}
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
    const { searchByDate } = this.state;
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
            const searchRegex = new RegExp(
              searchByDate.split(/ /).filter(l => l !== '').join('|'),
              'i'
            );
            const r1 = encuesta && encuesta.fecha.toString().search(searchRegex);
            const r2 = encuesta && encuesta.score.toString().search(searchRegex);
            if (r1 === -1 && r2 === -1 && searchByDate.length > 0) {
              return <TableRow />;
            }
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
            <TextField
              style={{ width: "50%" }}
              label="Filtro por puntaje y fecha"
              onInput={this.handleSearchDate}
            />
          </Grid>
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
  Meteor.subscribe("Encuestas.all");
  return {
    encuestas: Encuestas.find().fetch(),
  };
})(EncuestaPage);
