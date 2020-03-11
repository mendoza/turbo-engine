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
import {
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Legend
} from "recharts";
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

  calcularDatosBarra = () =>{
    const {encuestas} = this.props;
    const datos = [
      { name: "Enero", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Febrero", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Marzo", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Abril", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Mayo", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Junio", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Julio", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Agosto", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Septiembre", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Octubre", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Noviembre", Malo: 0, Bueno: 0, Excelente: 0 },
      { name: "Diciembre", Malo: 0, Bueno: 0, Excelente: 0 },
    ];
    encuestas.map(encuesta => {
      const date = new Date(encuesta.fecha);
      const month = date.getMonth();
      if(encuesta.score === 0){
        datos[month].Malo +=1
      } else if(encuesta.score === 1){
        datos[month].Bueno +=1
      } else {
        datos[month].Excelente +=1
      }
    }); 
    return datos;
  }

  calcularDatosCircular = () =>{
    const {encuestas} = this.props;
    const datos = [
      { name: "Malo", value: 0, fill: "#ec7063"  },
      { name: "Bueno", value: 0 , fill: "#5499c7"},
      { name: "Excelente", value: 0 , fill: "#52be80"},
    ];
    encuestas.map(encuesta => {
      if(encuesta.score === 0){
        datos[0].value += 1;
      } else if(encuesta.score === 1){
        datos[1].value += 1;
      } else {
        datos[2].value += 1;
      }
    }); 
    return datos;
  }

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
            <TableCell>Opciones</TableCell>
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
                          <i className="fas fa-info" />
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

  renderGraficoBarra = () =>{
    return(
      <BarChart 
        margin={{top: 20, right: 20, bottom: 20, left: 20,}}
        width={1000} 
        height={300} 
        data={this.calcularDatosBarra()}
        >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Malo" fill="#ec7063 " />
        <Bar dataKey="Bueno" fill="#5499c7" />
        <Bar dataKey="Excelente" fill="#52be80" />
      </BarChart>
    );
  }

  renderGraficoCircular = () =>{
    return (
      <PieChart width={730} height={250}>
        <Pie 
          data={ this.calcularDatosCircular()} 
          dataKey="value" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={50} 
          label 
          />
        <Legend />
      </PieChart>
    );
  }

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
          <Grid container className="gridRoot">
            <Title>Encuestas por mes</Title>
          </Grid>
          <Grid container className="gridRoot">
            {this.renderGraficoBarra()}
          </Grid>
          <Grid container className="gridRoot">
            <Title>Encuestas por año</Title>
          </Grid>
          <Grid container className="gridRoot">
            {this.renderGraficoCircular()}
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
